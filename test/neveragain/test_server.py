#!/usr/bin/python
import socket
import re
import sys
import datetime
import pytz
import random

def random_tag(l, dtag):
  while 1:
    w, tag = random.choice(l)

    if tag[:2] == dtag[:2]:
      return w



def generate_pasta_message(ow_fields):
  """Have a little fun and make pretend, unique, emails for testing. Will use
  nltk for some goofing around if we can."""
  fields = {
    'message_id': '<911885125.6648512@neveraga.in>',
    'date': (datetime.datetime.now(pytz.timezone('US/Pacific')) - datetime.timedelta(days=random.randint(0,7), hours=random.randint(0,24), minutes=random.randint(0,60))).strftime('%a, %d %b %Y %H:%M:%S %Z'),
    'subject': 'This is a test email! Random ID: %d' % random.randint(1, 10000),
    'body': 'If you install NLTK, and grab the `brown` and `names` corpera then you can get random subject lines and message bodies, making it easier to tell emails apart and less boring to read. You should probably do that.',
    'from': 'Scriptotron <scriptotron@neveraga.in>',
    'to': 'Ryan Jenkins <lanny@neveraga.in>'
  }

  try:
    import nltk
    w = nltk.corpus.brown.tagged_words()
    n = nltk.corpus.names.raw().split('\n')

    first = random.choice(n)
    last = random_tag(w, 'NN')

    mailer = random_tag(w, 'VB')

    fields['from'] = '%s %s <%s.%s@%smail.com>' % (first.title(), last.title(), first.lower(), last.lower(), mailer.lower())

    thing = random_tag(w, 'NN')+'s'
    adj = random_tag(w, 'JJ')
    verb = random_tag(w, 'VB')
    adverb = random_tag(w, 'RB')
    thing2 = random_tag(w, 'NN')+'s'

    fields['subject'] = '%s are %s! You should %s %s' % (thing, adj, verb, adverb)

    b = '''I'm totally serious! %s are totally %s and %s and %s. You really need to %s for the sake of %s. %s, if you think about it, are quite a bit like %s in that they both are %s, but are different in that %s are %s while on the other hand %s are %s. Think about it!

Best regards on the matter of %s %s,
%s %s, over and out!''' % (thing, adj, random_tag(w, 'JJ'), random_tag(w, 'JJ'), verb, random_tag(w, 'NN'), thing, thing2, random_tag(w, 'JJ'), thing, random_tag(w, 'JJ'), thing2, random_tag(w, 'JJ'), adj, thing, first.title(), last.title())
    fields['body'] = b 

  except NameError: pass
  except LookupError: pass

  for f in ow_fields:
    fields[f] = ow_fields[f]

  return ''.join([
      'Message-ID: %(message_id)s\r\n',
      'Date: %(date)s\r\n',
      'From: %(from)s\r\n',
      'User-Agent: chainmail-test-utility\r\n',
      'MIME-Version: 1.0\r\n',
      'To: %(to)s\r\n',
      'Subject: %(subject)s\r\n',
      'Content-Type: text/plain; charset=ISO-8859-1; format=flowed\r\n',
      'Content-Transfer-Encoding: 7bit\r\n',
      '\r\n',
      '%(body)s\r\n',
      '\r\n.\r\n'
    ]) % fields

scripts = {
  'relay_script': [
    'EHLO [localhost]\r\n',
    'AUTH LOGIN\r\n',
    'lanny@neveraga.in'.encode('base64').strip() + '\r\n',
    'passthesaltpls'.encode('base64').strip() + '\r\n',
    'MAIL FROM:<lanny@neveraga.in>\r\n',
    'RCPT TO:<lan.rogers.book@gmail.com>\r\n',
    'DATA\r\n',
    generate_pasta_message({'to': 'lan.rogers.book@gmail.com', 'from': 'lanny@neveraga.in'}),
    'QUIT\r\n'
  ], 
  'endpoint_single_user': [
    'EHLO [localhost]\r\n',
    'MAIL FROM:<lan.rogers.book@gmail.com>\r\n',
    'RCPT TO:<lanny@neveraga.in>\r\n',
    'DATA\r\n',
    generate_pasta_message({'to': 'lanny@neveraga.in'}),
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
