#!/usr/bin/python2
import urllib2

try:
    s = urllib2.urlopen("http://localhost:9000/notify?msg=Complete").read()
except urllib2.HTTPError,e:
    print e.code
