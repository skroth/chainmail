-- Password is "passthesaltpls" hashed with a salt work factor of 10
-- Corrosponding private key X value is 58209383703813223294054720125890093284011777773867654071365836136169085519840
INSERT INTO users ("realname", "address", "hostname", "hashword", "elgamal_pub_key")
  VALUES ("Ryan Jenkins", "lanny", "neveraga.in", "$2a$10$0GUmnZ1BIFCl/p6XwT39cO5dnU7PWxp8bI7/yxN8YDyLzWEewAQqK", "{""g"":""ALBOIUfGbqEEvbDKnF7\/r7eTEt6efk98QkxG1j5mdwF7"",""p"":""AMP1dAI9SD68MgN50pCx8qtZUYywqflFLCc0jBbR3nZL"",""y"":""ZkE0r+Sqj\/Q9uLTwfSSredmZUaz01mPK0vZmbPrA9uQ=""}");

INSERT INTO forwarding_directives ("destination_address", "owner_id")
  VALUES ("lan.rogers.book@gmail.com", 1);

INSERT INTO messages (data, recv_date, recipient_id, aes_key, pub_key, iv)
  VALUES ("", 43, 1, "lol", "no key", "here");
