Chain Mail
==========

Chain Mail is a complete email package that aims to reduce the risk of storing
email on Chain Mail cooperative servers. The basic idea is that a cooperative
server stores public keys for every client it accepts and stores mail for. Upon
receiving an email it will use the appropriate key to encrypt the message and
then discard the plaintext message. This means that cooperative server will
never store readable emails, reducing the risk in the case of a compromised
database and fundamentally prohibiting server operators from reading their
client's mail.

Chain Mail attempts to be more secure than existing solutions, but it isn't
perfectly secure since other servers a user may send mail to can store that
user's mail however they want.

### Components:
* **SMTP Server** [almost finished] -- Receives and sends mail as a normal SMTP client does. Encrypts mail on disk using user's key.
* **IMAP Server** [in progress] -- Delivers encrypted mail to user's client.
* **Client-side IMAP proxy** [planned] -- Run on user's machine. Decrypts mail using user's key. Allows user to use traditional desktop mail clients.
* **Webmail client** [in progress] -- Runs on server. Decrypts user's mail client side in browser.

Everything is open source and thus able to be audited and run on one's own machine.

## Frequently Asked Questions

### What is `java.security.InvalidKeyException: Illegal key size`?  
TL;RD The U.S. Government is a dick, download this:

http://www.oracle.com/technetwork/java/javase/downloads/jce-6-download-429243.html

and stick it in `{java.home}/lib/security/`. On windows that usually translates
to `C:\Program Files\Java\jdk1.x.x_xx\jre`. On linux the java executable tends
to live in the bin subdirectory of `java.home`. On OSX, using java 7, a
`java_home` executable exists at
`/System/Library/Frameworks/JavaVM.framework/Versions/Current/Commands/` which
can give you an exact location of your java.home directory.

These files are necessary to uncripple Java's crpyto API which, by default,
disallows keys longer than 40 bits. Someone, at some point, apparently thought
this was a [good
idea](http://en.wikipedia.org/wiki/Export_of_cryptography_in_the_United_States),
and so now Oracle distributes the crippled files. We can't legally (or
conveniently) include the unlimited strength policy in our code so here we are.

### Can I still receive messages from non-cooperative servers?  
Yes. Chain Mail is designed to operate like a traditional mail server from the
perspective of other mail servers. It will accept messages from any foreign
server in the same way traditional mail stores would, the encryption happens
behind the scenes between the Chain Mail server and the client.

### Does Chain Mail work with my email provider?
Yes. Mostly. We support a encrypted forwarding scheme where we will forward
encrypted messages to any address you like. To read those messages, however
will require a means of decrypting the messages. We have planned an official
plugin for Gmail's web interface, a generalized solution for all webmail
providers, and (the most secure option) a local relay application that
communicates with a Chainmail server and acts as a IMAP server to any local
mail client (Outlook, Thunderbird, OSX Mail). If you have needs that one of
these does not provide for, we'll happily consider additional integration
strategies.

### But you're still receiving plaintext emails, right?
Yes. We believe Chain Mail is significantly more secure than your standard
Postfix style mail store, but it's important to understand that it's not
bulletproof. If a Chain Mail database is compromised no email can be recovered
from it but if there is an ongoing compromise of a chainmail server it would
be trivial for an attacker to recover mail before it is encrypted and entered
into the database. Likewise the operator of a Chain Mail server can not read
your messages once they're in the database, but could easily read them before
then, so you have to trust your server operator in the same way you have to
trust any mail store operator.

