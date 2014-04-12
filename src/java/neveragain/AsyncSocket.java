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
      if (lineSoFar[i] == '\n') {
        if (lineSoFar[i+1] == '\n' || true) {
          // This line is DONE, return that sucker
          String line = new String(lineSoFar, 0, i-startPos, "UTF-8");

          // Reclaim out buffer preserving any partial line
          in.position(i+2);
          in.limit(endPos);
          in.compact();

          return line;
        }
      }
    }

    return null;
  }
}
