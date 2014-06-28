package neveragain;

import java.nio.ByteBuffer;
import java.nio.channels.SocketChannel;
import java.util.regex.*;

import java.io.UnsupportedEncodingException;
import java.io.IOException;


public class AsyncSocket {
  // Fuck da police, I don't do private variables.
  public SocketChannel socket;
  public ByteBuffer in;
  public ByteBuffer out;
  public Pattern stringLiteralPat; // I'm sure there's some static magic I'm
  public boolean stringLiteralMode; // supposed to be using here.
  public int stringLiteralLeft;

  public AsyncSocket(SocketChannel socket) throws Exception {
    this.socket = socket;
    this.in = ByteBuffer.allocate(64 * 1024);
    this.out = ByteBuffer.allocate(64 * 1024);
    this.stringLiteralPat = Pattern.compile(".*\\{(\\d+)\\}$");
    this.stringLiteralMode = false;
    this.stringLiteralLeft = 0;

    if (socket.isBlocking()) {
      throw new Exception("This isn't going to go very well with a blocking "
          + "socket mate.");
    }
  }

  public String readLine() throws IOException, UnsupportedEncodingException {
    /* Returns a CRLF deliniated line as a string or NULL if we haven't read
     * one yet. */

    // Grab what we can from the socket, mark off what we got
    int readed = this.socket.read(this.in),
        endPos = this.in.position(),
        startPos = endPos - readed;

    byte[] lineSoFar = this.in.array();

    if (this.stringLiteralMode) {
      // Keep track of how many bytes we have left to read
      this.stringLiteralLeft -= readed;

      if (this.stringLiteralLeft < 1) {
        // Looks like we've read all the bytes in the string literal, now
        // switch back to regular mode and look for the EOL
        this.stringLiteralMode = false;

        // We don't want to scan for the EOL within the tail of the literal
        startPos += this.stringLiteralLeft;
      } else {
        // If we haven't read the whole literal then we don't want to check
        // for an EOL.
        return null;
      }
    }

    for (int i=startPos; i<endPos; i++) {
      if (lineSoFar[i] == '\r') {
        if (lineSoFar[i+1] == '\n') {
          // Newline, could be the line is done or this is the start of a 
          // string literal. Let's check.
          String line = new String(lineSoFar, 0, i, "UTF-8");

          Matcher match = stringLiteralPat.matcher(line);
          if (match.matches()) {
            // Ahh, the dread string literal, shift modes, can't return yet.
            this.stringLiteralMode = true;
            this.stringLiteralLeft = Integer.parseInt(match.group(1));

            // Compensate for any extra we snaggled in the last tread
            this.stringLiteralLeft -= endPos - (i + 2);

            return null;
          } else {
            // Regular line, return and continue as ususal
            this.in.position(i+2);
            this.in.limit(endPos);
            this.in.compact();

            return line;
          }
        }
      }
    }

    return null;
  }

  public void write(String line) throws IOException, 
         UnsupportedEncodingException {
    this.write(line.getBytes("UTF-8"));
  }

  public void write(byte[] line) throws IOException {
    // Add the line to our out buffer
    this.out.put(line);

    // arr[pos:limit] is the enitrety of our untransmitted buffer
    this.out.flip();
    this.socket.write(out);

    // arr[pos:limit] is still our untransmitted buffer, pos has been advanced
    this.out.compact();
  }
}
