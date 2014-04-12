package neveragain;

import java.nio.ByteBuffer;
import java.nio.channels.SocketChannel;

import java.io.UnsupportedEncodingException;
import java.io.IOException;

public class AsyncSocket {
  // Fuck da police, I don't do private variables.
  public SocketChannel socket;
  public ByteBuffer in;
  public ByteBuffer out;

  public AsyncSocket(SocketChannel socket) throws Exception {
    this.socket = socket;
    this.in = ByteBuffer.allocate(16 * 1024);
    this.out = ByteBuffer.allocate(16 * 1024);

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

    for (int i=startPos; i<endPos; i++) {
      if (lineSoFar[i] == '\r') {
        if (lineSoFar[i+1] == '\n') {
          // This line is DONE, return that sucker
          String line = new String(lineSoFar, 0, i-startPos, "UTF-8");

          // Reclaim out buffer preserving any partial line
          this.in.position(i+2);
          this.in.limit(endPos);
          this.in.compact();

          return line;
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
