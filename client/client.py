#!/usr/bin/python2
import cherrypy
from ws4py.server.cherrypyserver import WebSocketPlugin, WebSocketTool
from ws4py.websocket import WebSocket

cherrypy.config.update({'server.socket_port': 9000})
WebSocketPlugin(cherrypy.engine).subscribe()
cherrypy.tools.websocket = WebSocketTool()

SUBSCRIBERS = set()

class Publisher(WebSocket):
    def __init__(self, *args, **kw):
        WebSocket.__init__(self, *args, **kw)
        SUBSCRIBERS.add(self)

    def closed(self, code, reason=None):
        SUBSCRIBERS.remove(self)

class Root(object):
    @cherrypy.expose
    def index(self):
        return open('ws_browser.html').read()

    @cherrypy.expose
    def ws(self):
        "Method must exist to serve as a exposed hook for the websocket"

    @cherrypy.expose
    def notify(self, msg):
        for conn in SUBSCRIBERS:
            conn.send(msg)

cherrypy.quickstart(Root(), '/', config={'/ws': {'tools.websocket.on': True,
                                                 'tools.websocket.handler_cls': Publisher}})
