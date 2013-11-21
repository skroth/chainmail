#!/usr/bin/python
import socket
import re

relay_script = [
	'EHLO [localhost]\r\n',
	'AUTH LOGIN\r\n',
	'lanny@neveraga.in'.encode('base64').strip() + '\r\n',
	'passthesaltpls'.encode('base64').strip() + '\r\n',
	'MAIL FROM:<lanny@neveraga.in>\r\n',
	'RCPT TO:<lan.rogers.book@gmail.com>\r\n',
	'DATA\r\n',
	'Hey brah, what\'s up?\r\n.\r\n'
]

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

	script_name = "SMTP SERVER RELAY TEST SCRIPT"

	print '#' * (len(script_name) + 6)
	print '## %s ##' % script_name 
	print '#' * (len(script_name) + 6)

	print 'R: %s' % recv_line(s)

	for op in relay_script:
		print 'S: %s' % op.strip()
		s.send(op)

		cont = True
		while cont:
			response = recv_line(s)
			print 'R: %s' % response

			if re.match(r'\d{3}($| .+$)', response):
				cont = False

	s.close()
