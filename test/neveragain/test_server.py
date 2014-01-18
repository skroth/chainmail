#!/usr/bin/python
import socket
import re
import sys

scripts = {
  'relay_script': [
    'EHLO [localhost]\r\n',
    'AUTH LOGIN\r\n',
    'lanny@neveraga.in'.encode('base64').strip() + '\r\n',
    'passthesaltpls'.encode('base64').strip() + '\r\n',
    'MAIL FROM:<lanny@neveraga.in>\r\n',
    'RCPT TO:<lan.rogers.book@gmail.com>\r\n',
    'DATA\r\n',
    ''.join([
      'Message-ID: <lol.lol@neveraga.in>\r\n',
      'Date: Tue, 07 Jan 2014 23:19:31 -0800\r\n',
      'From: Ryan Jenkins <lanny@neveraga.in>\r\n',
      'User-Agent: chainmail-test-utility\r\n',
      'MIME-Version: 1.0\r\n',
      'To: lan.rogers.book@gmail.com\r\n',
      'Subject: Can you hear me now?\r\n',
      'Content-Type: text/plain; charset=ISO-8859-1; format=flowed\r\n',
      'Content-Transfer-Encoding: 7bit\r\n',
      '\r\n',
      'Woot, secuirty. Hellz to teh yeah.\r\n',
      '\r\n',
      'Sent from my testscriptPhone.\r\n',
      '\r\n.\r\n'
    ]),
    'QUIT\r\n'
  ], 
  'endpoint_single_user': [
    'EHLO [localhost]\r\n',
    'MAIL FROM:<lan.rogers.book@gmail.com>\r\n',
    'RCPT TO:<lanny@neveraga.in>\r\n',
    'DATA\r\n',
    ''.join([
      'Message-ID: <52CCFC03.2010102@gmail.com>\r\n',
      'Date: Tue, 07 Jan 2014 23:19:31 -0800\r\n',
      'From: Ryan Jenkins <lan.rogers.book@gmail.com>\r\n',
      'User-Agent: Mozilla/5.0 (Windows NT 6.2; WOW64; rv:24.0) Gecko/20100101 Thunderbird/24.1.0\r\n',
      'MIME-Version: 1.0\r\n',
      'To: lanny@neveraga.in\r\n',
      'Subject: Sup Brah?\r\n',
      'Content-Type: text/plain; charset=ISO-8859-1; format=flowed\r\n',
      'Content-Transfer-Encoding: 7bit\r\n',
      '\r\n',
      'qwertyuiop\r\n',
      '\r\n',
      'loljk\r\n',
      '\r\n.\r\n'
    ]),
    'QUIT\r\n'
  ]}

g_buffer = ''
def recv_line(s, delimiter='\r\n'):
  global g_buffer

  while delimiter not in g_buffer:
    g_buffer += s.recv(2000)

  line, g_buffer = g_buffer.split(delimiter, 1)

  return line

if __name__ == '__main__':
  s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
  s.connect(('localhost', 2500))

  script_name = sys.argv[1]

  print '#' * (len(script_name) + 6)
  print '## %s ##' % script_name 
  print '#' * (len(script_name) + 6)

  print 'R: %s' % recv_line(s)

  for op in scripts[script_name]:
    print 'S: %s' % op.strip()
    s.send(op)

    cont = True
    while cont:
      response = recv_line(s)
      print 'R: %s' % response

      if re.match(r'\d{3}($| .+$)', response):
        cont = False

  s.close()
