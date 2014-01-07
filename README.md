Chain Mail
==========

A secure full package email solution that provides server software and web client front end.


## Frequently Asked Questios

### What is `java.security.InvalidKeyException: Illegal key size`?
TL;RD U.S. Government is a dick, download this:

http://www.oracle.com/technetwork/java/javase/downloads/jce-6-download-429243.html

and stick it in `{java.home}/lib/security/`. On windows that usually translates to `C:\Program Files\Java\jdk1.x.x_xx\jre`. On linux the java executable tends to live in the bin subdirectory of `java.home`.

These files are necessary to uncripple Java's crpyto API which, by default, disallows keys longer than 40 bits. Someone, at some point, apparently thought this was a [good idea](http://en.wikipedia.org/wiki/Export_of_cryptography_in_the_United_States), and so now Oracle distributes the crippled files, we can't legally (or conveniently) include the unlimited strength policy in our code so here we are.