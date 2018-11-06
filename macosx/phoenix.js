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
  var oldScreenRect = window.screen().frame();
  var newScreenRect = screen.flippedVisibleFrame();

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
  if (window) {
    var screen = window.screen().flippedVisibleFrame();
    window.setFrame({
      x: screen.x,
      y: screen.y,
      width: screen.width,
      height: screen.height
    });
  }
}

function toLeftHalfOfScreen(window) {
  if (window) {
    var screen = window.screen().frame();
    window.setFrame({
      x: screen.x,
      y: screen.y,
      width: screen.width / 2,
      height: screen.height
    });
  }
}

function toRightHalfOfScreen(window) {
  if (window) {
    var screen = window.screen().frame();
    window.setFrame({
      x: screen.x + screen.width / 2,
      y: screen.y,
      width: screen.width / 2,
      height: screen.height
    });
  }
}

function toTopHalfOfScreen(window) {
  if (window) {
    var screen = window.screen().flippedVisibleFrame();
    window.setFrame({
      x: screen.x,
      y: screen.y,
      width: screen.width,
      height: screen.height / 2
    });
  }
}

function toBottomHalfOfScreen(window) {
  if (window) {
    var screen = window.screen().flippedVisibleFrame();
    window.setFrame({
      x: screen.x,
      y: screen.y + screen.height / 2,
      width: screen.width,
      height: screen.height / 2
    });
  }
}

function appByTitle(title, callback) {
  var apps = App.all();
  for (i = 0; i < apps.length; i++) {
    var app = apps[i];
    if (app.name() == title) {
      app.show();
      callback(app);
    }
  }
}

function firstWindow(app) {
  return app.windows({ "visible": true })[0];
}

function eq(expected) {
  return function(actual) {
    return actual == expected;
  }
}

function not(matcher) {
  return function(actual) {
    return !matcher(actual);
  }
}

function method(name) {
  return function(win) {
    return win[name]();
  }
}

function windowWith(valueExtractor, valueMatcher) {
  return function(app) {
    var windows = app.windows(), win;
    for (var i in windows) {
      win = windows[i];
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

var m = new Key('m', ['cmd', 'ctrl', 'alt'], function () {
  toFullScreen(Window.focused());
});

// api.bind('right', ['ctrl', 'alt'], function() {
//   var win = Window.focused();
//   moveToScreen(win, win.screen().previousScreen());
// });

// api.bind('left', ['ctrl', 'alt'], function() {
//   var win = Window.focused();
//   moveToScreen(win, win.screen().nextScreen());
// });

// api.bind('4', ['cmd', 'ctrl', 'alt'], function() {
//   var apps = App.runningApps(), app, frame, win;
//   var result = [];
//   for (var i in apps) {
//     app = apps[i];
//     win = app.visibleWindows()[0];
//     if (win) {
//       frame = win.frame();
//       result.push("appByTitle('" + app.title() + "', resize(firstWindow, " + frame.x + ", " + frame.y + ", " + frame.width + ", " + frame.height + "))");
//     }
//   }
//   api.alert(result.join("\n"), 10);
// });

var lh = new Key('left', ['cmd', 'ctrl', 'alt'], function () {
  toLeftHalfOfScreen(Window.focused());
});

var rh = new Key('right', ['cmd', 'ctrl', 'alt'], function () {
  toRightHalfOfScreen(Window.focused());
});

var uh = new Key('up', ['cmd', 'ctrl', 'alt'], function () {
  toTopHalfOfScreen(Window.focused());
});

var bh = new Key('down', ['cmd', 'ctrl', 'alt'], function () {
  toBottomHalfOfScreen(Window.focused());
});

function screenByIndex(index) {
  return Screen.all().sort(function(screen1, screen2) {
    return screen1.frame().x - screen2.frame().x;
  })[index];
}

var organize = new Key('3', ['cmd', 'ctrl', 'alt'], function () {
  appByTitle('iTerm2', function(app) {
    app.mainWindow().setFrame(screenByIndex(0).flippedVisibleFrame());
  });

  // appByTitle('iTerm2', resize(firstWindow, -1440, 202, 1440, 878));

  appByTitle('Airmail', resize(firstWindow, 300, 216, 1362, 622));
  appByTitle('ReadKit', resize(firstWindow, 606, 72, 1148, 653));

  appByTitle('Nightly', compose(toFullScreen, firstWindow));

  appByTitle('Sublime Text', resize(firstWindow, 0, 23, 1920, 1125));

  appByTitle('Twitter', resize(firstWindow, 1974, 42, 500, 750));
  appByTitle('Adium', resize(windowWith(method('title'), eq('Contacts')), 2572, 42, 250, 750));
  appByTitle('Adium', resize(windowWith(method('title'), not(eq('Contacts'))), 2372, 450, 750, 500));
  appByTitle('Skype', resize(firstWindow, 2902, 42, 900, 750));
});

// api.bind('3', ['cmd', 'ctrl', 'alt'], function() {

// });
