function compose() {
  var functions = Array.prototype.slice.call(arguments);
  if (functions.length == 0) {
    throw "Invalid number of arguments";
  }
  return function() {
    var args = Array.prototype.slice.call(arguments);
    var result = functions[functions.length - 1].apply(null, args), i;
    for (i = functions.length - 2; i >= 0; i--) {
      result = functions[i](result);
    }
    return result;
  }
}

function moveToScreen(window, screen) {
  if (!screen) {
    return;
  }

  var frame = window.frame();
  var oldScreenRect = window.screen().frameWithoutDockOrMenu();
  var newScreenRect = screen.frameWithoutDockOrMenu();

  var xRatio = newScreenRect.width / oldScreenRect.width;
  var yRatio = newScreenRect.height / oldScreenRect.height;

  window.setFrame({
    x: (Math.round(frame.x - oldScreenRect.x) * xRatio) + newScreenRect.x,
    y: (Math.round(frame.y - oldScreenRect.y) * yRatio) + newScreenRect.y,
    width: Math.round(frame.width * xRatio),
    height: Math.round(frame.height * yRatio)
  });
}

function toFullScreen(window) {
  var screen = window.screen().frameWithoutDockOrMenu();
  window.setFrame({
    x: screen.x,
    y: screen.y,
    width: screen.width,
    height: screen.height
  });
}

function appByTitle(title, callback) {
  var apps = App.runningApps();
  for (i = 0; i < apps.length; i++) {
    var app = apps[i];
    if (app.title() == title) {
      app.show();
      callback(app);
    }
  }
}

function firstWindow(app) {
  return app.visibleWindows()[0];
}

function eq(expected) {
  return function(actual) {
    return actual == expected;
  }
}

function notEq(expected) {
  return function(actual) {
    return actual != expected;
  }
}

function method(name) {
  return function(win) {
    return win[name]();
  }
}

function windowWith(valueExtractor, valueMatcher) {
  return function(app) {
    var win;
    for (var i in app.allWindows()) {
      win = app.allWindows()[i];
      if (valueMatcher(valueExtractor(win))) {
        return win;
      }
    }
    return null;
  }
}

function resize(windowMatcher, x, y, width, height) {
  return function(app) {
    var win = windowMatcher(app);
    if (win) {
      var frame = win.frame();
      frame.x = x;
      frame.y = y;
      frame.width = width;
      frame.height = height;
      win.setFrame(frame);
    }
  }
}

api.bind('m', ['cmd', 'alt', 'ctrl'], function() {
  toFullScreen(Window.focusedWindow());
});

api.bind('right', ['ctrl', 'alt'], function() {
  var win = Window.focusedWindow();
  moveToScreen(win, win.screen().previousScreen());
});

api.bind('left', ['ctrl', 'alt'], function() {
  var win = Window.focusedWindow();
  moveToScreen(win, win.screen().nextScreen());
});

api.bind('4', ['cmd', 'ctrl', 'alt'], function() {
  var apps = App.runningApps(), app, frame, win;
  var result = [];
  for (var i in apps) {
    app = apps[i];
    win = app.visibleWindows()[0];
    if (win) {
      frame = win.frame();
      result.push("appByTitle('" + app.title() + "', resize(firstWindow, " + frame.x + ", " + frame.y + ", " + frame.width + ", " + frame.height + "))");
    }
  }
  api.alert(result.join("\n"), 10);
});

api.bind('3', ['cmd', 'ctrl', 'alt'], function() {
  appByTitle('iTerm2', resize(firstWindow, -1440, 202, 1440, 878));

  appByTitle('Airmail', resize(firstWindow, 300, 216, 1362, 622));
  appByTitle('ReadKit', resize(firstWindow, 606, 72, 1036, 653));

  appByTitle('Nightly', compose(toFullScreen, firstWindow));

  appByTitle('Sublime Text', resize(firstWindow, 0, 22, 1920, 988));

  appByTitle('Twitter', resize(firstWindow, 1974, 42, 500, 750));
  appByTitle('Adium', resize(windowWith(method('title'), eq('Contacts')), 2572, 42, 250, 750));
  appByTitle('Adium', resize(windowWith(method('title'), notEq('Contacts')), 2372, 450, 750, 500));
  appByTitle('Skype', resize(firstWindow, 2902, 42, 900, 750));
});
