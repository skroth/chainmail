SETTINGS = {
  dateTimeFormat: "%a %b %d %I:%M %p",
  maxLineLength: 78
}

function InboxModel() {
  var self = this

  self.messageSets = {
    'inbox': {
      messages: ko.observableArray(),
      url: '/messages?tag=inbox'
    },
    'all': {
      messages: ko.observableArray(),
      url: '/messages?tag=*'
    }
  }

  self.key = ko.observable(null)
  self.statusText = ko.observable('transfering messages')

  self.composeDialogs = ko.observableArray()
  self.activeMessageSet = ko.observable(self.messageSets.inbox)
  self.activeMessageSet.subscribe(function(newSet) {
    self.statusText('transfering messages')

    $.getJSON(newSet.url, function(data) {
      // If we're not populating a new list then show the old one and build up
      // the new one behind the scenes, only swapping in when it's finished.
      var addAsProc = !newSet.messages().length,
        newM = [],
        i = 0

      ;(function next(rest) {
        var baseText = 'decrypting message ' + (++i) + ' of ' + data.length
        self.statusText(baseText + ' (elGamal)')

        var message = rest.pop(),
          cipherKey = sjcl.codec.base64.toBits(message.aes_key),
          AESKey = elGamalDecrypt(cipherKey, privKey)

        self.statusText(baseText + ' (AES)')

        var cipherText = sjcl.codec.base64.toBits(message.data),
          iv = sjcl.codec.base64.toBits(message.iv),
          cipher = new sjcl.cipher.aes(AESKey),
          result = sjcl.mode.ccm.decrypt(cipher, cipherText, iv, [], 64),
          parsed = parse2822Message(sjcl.codec.utf8String.fromBits(result))

        // Add back some of the metadata that wasn't encrypted
        parsed.chainmailID = message.id
        parsed.chainmailDate = new Date(message.recv_date * 1000)
        parsed.chainmailInboxTag = message.tag_id

        if (addAsProc)
          newSet.messages.push(parsed)
        else
          newM.push(parsed)

        // Recur after a timeout, we need to yield control back to the render
        // "thread" for a bit.
        if (rest.length) {
          window.setTimeout(function() { next(rest) }, 0)
        } else {
          self.statusText('done')
          window.setTimeout(function() { self.statusText(null) }, 1000)

          if (!addAsProc)
            newSet.messages(newM)
        }
      })(data)
    })
  })

  self.activeMessage = ko.observable(null)
  self.messages = ko.computed(function() { return self.activeMessageSet().messages() })
  self.messagePaneWidth = ko.observable(50)

  self.listPaneWidth = ko.computed(function() {
    return 100 - self.messagePaneWidth()
  })

  // Settings and account details about this user (the one hopefully at the
  // keyboard)
  self.me = null

  self.envl = {
    to: ko.observable(),
    subject: ko.observable(),
    body: ko.observable()
  }

  self.setActiveMessage = function(message) {
    self.activeMessage(message)
  }

  self.archiveSingleMessage = function(message) {
    $.get('/remove-tags', { tags: message.chainmailInboxTag }, function(data) {
      self.messageSets.inbox.messages.remove(message)
    })
  }

  self.composeNew = function() {
    self.compose()
  }

  self.compose = function(preloadData) {
    /* Open the compose dialog, accepts a single option argument. If that
    argument is omitted the compose modal will be activated without touching its
    state, othewise all fields will be emptied and populated with data specified
    by an object passes as the first arg */
    var cm = new composeModel(preloadData)
    self.composeDialogs.push(cm)
  }

  self.closeCompose = function() {
    $('#compose-modal').foundation('reveal', 'close')
  }

  self.composeReply = function(origMessage) {
    var preloadData = {
      to: origMessage.From,
      subject: origMessage.Subject,
      body: blockQuote(origMessage)
    }

    if (!preloadData.subject.match(/^re:.*/i))
      preloadData.subject = 're: ' + preloadData.subject

    self.compose(preloadData)
  }

  self.sendStatusHandler = function(data, status, xhr) {

  }

}

function composeModel(preloadData) {
  var self = this

  self.to = ko.observableArray()
  self.subject = ko.observable()
  self.body = ko.observable()

  self.title = ko.computed(function() {
    return self.subject()?self.subject():'New Message'
  })

  self.send = function(root) {
    var message = 'Content-Transfer-Encoding: "8bit"\r\n' +
      'Content-Type: "text/plain; charset=utf-8"\r\n' +
      'Date: ' + strftime('%a, %d %b %Y %H:%M:%S %Z', new Date()) + '\r\n' +
      'From: "' + root.me.realname + ' <' + root.me.address + '>"\r\n' +
      'MIME-Version: "1.0"\r\n' +
      'Message-ID: "<' + Date.now() + '.' + Math.random().toString().substr(2) +
        '@' + root.me.address.split('@')[1] + '>"\r\n' +
      'Subject: "' + self.subject().replace(/[\r\n]/gi, '') + '"\r\n' +
      'To: "' + self.to() + '"\r\n' +
      'User-Agent: "Chainmail/WebClient"\r\n' +
      '\r\n' + transmitEncode(self.body())

    $.post('/send', { content: message })
  }

  self.close = function(root) {
    root.composeDialogs.remove(self)
  }

  if (preloadData !== undefined) {
      self.to(preloadData.to || [])
      self.subject(preloadData.subject || '')
      self.body(preloadData.body || '')
  }
}


X = "AICxV/iefCH6D7LCr+iQBIjzrCM2CZcT39VAqCUcJsfg"
P = "AMP1dAI9SD68MgN50pCx8qtZUYywqflFLCc0jBbR3nZL"

privKey = {
  p: sjcl.bn.fromBits(sjcl.codec.base64.toBits(P)),
  x: sjcl.bn.fromBits(sjcl.codec.base64.toBits(X))
}

function serializeKey(key) {
  // Returns a string
  return JSON.stringify({
    p: sjcl.codec.base64.fromBits(key.p.toBits()),
    x: sjcl.codec.base64.fromBits(key.x.toBits()),
    y: sjcl.codec.base64.fromBits(key.y.toBits()),
    g: sjcl.codec.base64.fromBits(key.g.toBits()),
  })
}

//{"x":"Z3Ugbe3j+QbZf889HPlXYR6s3WkC+aQMc9XD9Vd/Oa4=","y":"YtI+hbFCe+f1iIswvh/1ad1AEHvH2V48t0ZsYE0HlxM=","g":"NbNUJRXy2HgHp9IbXKqtle5JaXQhzEzTEjLtk/Lms8o=","p":"AOY0XfbbJ8gXURuL429Wyp9yNI7sxHsNiO1yi4t+84g/"}

function deserializeKey(key) {
  // Returns an object, values are sjcl bignums
  var p = JSON.parse(key),
    bnFields = ['p', 'x', 'g', 'y']

  for (var i=0; i<bnFields.length; i++) {
    var s = p[bnFields[i]]
    p[bnFields[i]] = sjcl.bn.fromBits(sjcl.codec.base64.toBits(s))
  }

  return p
}

function fetchPrivKey(callback) {
  /* Looks for possible places of storing a private key in the browser (right
  now that means local storage) and if non is found initiates UI to request it
  from the user. Requires Foundation but otherwise trys to make no assumptions
  about the DOM. */
  var pk 
  try { pk = deserializeKey(localStorage.getItem('cmPrivKey')) }
  catch (error) {}

  if (pk) {
    callback?callback(pk):null
  } else {
    var modal = $(''
      + '<div id="privkey-modal" class="reveal-modal" data-reveal>'
        + '<h2>Hark! Present thine private key!</h2>'
        + '<p>Hark, without thine private key thou wilst surely fail on '
          + 'thine quest! Present it now that we may yet succeed!</p>'
        + '<textarea></textarea>'
        + '<a class="button right" id="privkey-modal-submit">'
          + 'Sally Forth!'
        + '</a>'
      + '</div>')
      .prependTo('body')
      .foundation()
      .foundation('reveal', 'open')

    modal.find('#privkey-modal-submit')
      .on('click', function(e) {
        e.preventDefault()

        try {
          var key = deserializeKey(modal.find('textarea').val())
          modal.foundation('reveal', 'close')
            .delay(100)
            .remove()
          
          callback?callback(key):null
        } catch (err) {
          alert('Hark fair knight, thine key douth fail you in this time most '
            + 'dire! The nature of the failure is purported to be: '
            + err.message)
        }
      })
  }
}

function elGamalDecrypt(block, privKey) {
  // Pretty much a line for line transliteration of BC's ElGamal decrpytion
  var inBitLength = sjcl.bitArray.bitLength(block),
    in1 = sjcl.bitArray.bitSlice(block, 0, inBitLength/2),
    in2 = sjcl.bitArray.bitSlice(block, inBitLength/2, inBitLength),
    gamma = sjcl.bn.fromBits(in1),
    phi = sjcl.bn.fromBits(in2),
    result = gamma.powermod(privKey.p.sub(1).sub(privKey.x), privKey.p)
      .mul(phi)
      .mod(privKey.p)

    return result.toBits()
}

function parse2822Message(rawMessage) {
  /* Takes a raw string representing an email per the RFC 2822 spec
  and returns a simple, serializable, object containing each header as a
  propery and message content in a special `body` property */
  var parsedMessage = {},
    parts = rawMessage.split('\r\n\r\n')

  if (parts.length < 2) {
    throw { name: 'ParseError', message: 'Empty body or empty message'}
  }

  var headers = parts[0].split('\r\n'),
    body = parts.slice(1).join('\r\n\r\n')

  for (var i=0; i<headers.length; i++) {
    var parts = headers[i].split(':'),
      name = parts[0].trim(),
      value = parts.slice(1).join(':').trim()

    parsedMessage[name] = value
  }

  if (parsedMessage.Date)
    parsedMessage.Date = new Date(Date.parse(parsedMessage.Date))

  parsedMessage.body = body

  return parsedMessage
}

function transmitEncode(message) {
  /* Takes the proposed body of a message and line-wraps and escapes it as
  needed for transmission via SMTP */
  if (SETTINGS.maxLineLength > 998) {
    throw "Bad shit is going to happen if you send an email with lines longer" +
      "than 998 characters."
  }
  var parts = message.split(/\r?\n/),
    lines = []

  for (var i=0; i<parts.length; i++) {
    var part = parts[i],
      k = SETTINGS.maxLineLength

    while (part.length > SETTINGS.maxLineLength) {
      while (part[k] != ' ' && k > 0)
        k--

      if (k <= 0)
        k = SETTINGS.maxLineLength

      lines.push(part.substr(0,k))
      part = part.substr(k+1)
      k = SETTINGS.maxLineLength
    }

    lines.push(part)
  }

  return lines.join('\r\n') + '\r\n.\r\n'
}

function blockQuote(message) {
  /* Takes a 2822 style message object and returns it with one higher level of
  block quotation and a header identifying the original author and time */
  return '\r\n\r\nOn ' + ftime(message.Date) +
    ', ' + message.From + ' wrote:\r\n' +
    message.body.replace(/(^|[\r\n][\r\n]?)/g, '$1>')
}

function relativeTime(then) {
  var now = new Date(),
    delta = now - then,
    times = [
      ['year', 1000*60*60*24*356],
      ['month', 1000*60*60*24*28],
      ['day', 1000*60*60*24],
      ['hour', 1000*60*60],
      ['minute', 1000*60]
    ]

  for (var i = 0; i < times.length; i++) {
    var amount = Math.floor(delta / times[i][1])
    if (amount) {
      var m = amount>1
      return (m?amount+' ':'a ') + times[i][0] + (m?'s':'') + ' ago'
    }
  }

  return 'just now'
}

function ftime(d) {
  return strftime(SETTINGS.dateTimeFormat, d)
}

function pad(number, padTo) {
  var r = number.toString() // Not sure this actually matters

  while (r.length < padTo) r = '0' + r

  return r
}

function strftime(formatString, d) {
  var fullDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',
    'Saturday'],
    fullMonths = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December']
    recognizedFormats = {
      'A': function(c) { return fullDays[d.getDay()] },
      'a': function(c) { return fullDays[d.getDay()].substr(0, 3) },
      'B': function(c) { return fullMonths[d.getMonth()] },
      'b': function(c) { return fullMonths[d.getMonth()].substr(0, 3) },
      'd': function(c) { return pad(d.getDay(), 2) },
      'H': function(c) { return d.getHours() },
      'I': function(c) { var h = d.getHours(); return h-((h>12)?12:0) },
      'M': function(c) { return pad(d.getMinutes(), 2) },
      'p': function(c) { return (d.getMinutes()>12)?'pm':'am' },
      'S': function(c) { return pad(d.getSeconds(), 2) },
      's': function(c) { return Math.floor(d.valueOf()).toString() },
      'Y': function(c) { return d.getFullYear().toString() },
      'y': function(c) { return d.getFullYear().toString().substr(3) },
      'Z': function(c) { var o=d.getTimezoneOffset(),h=Math.floor(o/60),m=o-h*60; return 'GMT' + ((o>0)?'-':'+') + pad(h, 2) + pad(m, 2) }
    },
    matchables = ''

  for (c in recognizedFormats) { matchables += c }

  var matcher = RegExp('%([' + matchables + '])', 'g')

  return formatString.replace(matcher, function(_, c) { return recognizedFormats[c]() })
}

$.getJSON('/orient', function(data) { viewModel.me = data })

function getHumanName(s) {
  /* Takes an address in the form "Name <address@domain>" and returns name if
  present or just the address no name is available. */
  var match = s.match(/^(.+?) <.+>$/)
  if (match) {
    return match[1]
  } else {
    return s
  }
}

function getEmailAddress(s) {
  var match = s.match(/^.+ <(.+?)>$/)
  if (match) {
    return match[1]
  } else {
    return s
  }
}

;(function() {
  viewModel = new InboxModel()
  ko.applyBindings(viewModel)

  // Init up foundation
  $(document).foundation()

  fetchPrivKey(function (key) {
    localStorage.setItem('cmPrivKey', serializeKey(key))
    viewModel.key(key)
    viewModel.activeMessageSet(viewModel.messageSets.inbox)
  })

  // And start loading these mofos
  //viewModel.onMessageSetChange(viewModel.messageSets.inbox)
})()
