// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"script.js":[function(require,module,exports) {
var hitCount = 0;
var playerHitCount = 5;
var isPlayerHit = false;
var hitIndicator = document.createElement('div');
hitIndicator.innerText = "Hits 100/ ".concat(hitCount);
hitIndicator.style.position = 'absolute';
hitIndicator.style.top = '10px'; // Adjust as needed
hitIndicator.style.left = '10px'; // Adjust as needed
hitIndicator.style.fontSize = '50px'; // Adjust as needed
hitIndicator.style.zIndex = '1000'; // Ensure it's on top of other elements
hitIndicator.style.backgroundColor = 'red'; // Optional: for better visibility
hitIndicator.style.padding = '50px'; // Optional: for better appearance
document.body.appendChild(hitIndicator);
var playerHitIndicator = document.createElement('div');
playerHitIndicator.innerText = "Lives: ".concat(playerHitCount);
playerHitIndicator.style.position = 'absolute';
playerHitIndicator.style.top = '10px';
playerHitIndicator.style.right = '10px';
playerHitIndicator.style.fontSize = '20px';
playerHitIndicator.style.zIndex = '1000';
playerHitIndicator.style.backgroundColor = 'green';
playerHitIndicator.style.padding = '5px';
document.body.appendChild(playerHitIndicator);
var player = document.getElementById('player');
var npc = document.getElementById('npc');
var playerFrameIndex = 0;
var npcFrameIndex = 0;
var playerNumberOfFrames = 9; // Adjust based on your player sprite sheet
var npcNumberOfFrames = 7; // Adjust based on your NPC sprite sheet
var playerFrameWidth = 79; // Width of a single frame for the player
var playerFrameHeight = 140; // Height of a single frame for the player
var npcFrameWidth = 210; // Width of a single frame for the NPC
var npcFrameHeight = 376; // Height of a single frame for the NPC
var speed = 10; // Walking speed in pixels

var projectile = document.getElementById('projectile');
var isShooting = false;
document.addEventListener('keydown', function (event) {
  var gameContainer = document.querySelector('.game-container');
  var maxLeft = gameContainer.offsetWidth - player.offsetWidth;
  var maxTop = gameContainer.offsetHeight - player.offsetHeight;
  if (event.key === 'ArrowRight' && player.offsetLeft < maxLeft) {
    player.style.transform = 'translate(-50%, -50%) scaleX(1)'; // Normal orientation
    player.style.left = "".concat(player.offsetLeft + speed, "px");
    animatePlayer();
  } else if (event.key === 'ArrowLeft' && player.offsetLeft > 0) {
    player.style.transform = 'translate(-50%, -50%) scaleX(-1)'; // Mirrored orientation
    player.style.left = "".concat(player.offsetLeft - speed, "px");
    animatePlayer();
  }
  if (event.key === ' ' && !isShooting) {
    // Space bar
    shootProjectile();
  }
});
function animatePlayer() {
  playerFrameIndex = (playerFrameIndex + 1) % playerNumberOfFrames;
  var xOffset = playerFrameIndex * playerFrameWidth;
  var yOffset = 0; // Adjust if your player sprite sheet has frames in multiple rows
  player.style.backgroundPosition = "-".concat(xOffset, "px -").concat(yOffset, "px");
}
function animateNPC() {
  npcFrameIndex = (npcFrameIndex + 1) % npcNumberOfFrames;
  var xOffset = npcFrameIndex * npcFrameWidth;
  var yOffset = 0; // Adjust if your NPC sprite sheet has frames in multiple rows
  npc.style.backgroundPosition = "-".concat(xOffset, "px -").concat(yOffset, "px");
  npc.style.width = "".concat(npcFrameWidth, "px");
  npc.style.height = "".concat(npcFrameHeight, "px");
}
function followPlayer() {
  var gameContainer = document.querySelector('.game-container');
  var maxLeft = gameContainer.offsetWidth - npc.offsetWidth;
  var playerX = player.offsetLeft + player.offsetWidth / 2;
  var npcX = npc.offsetLeft + npc.offsetWidth / 2;
  var deltaX = playerX - npcX;
  var npcSpeed = speed / .75; // NPC moves slightly slower than the player
  var moveX = (deltaX > 0 ? 1 : -1) * npcSpeed;
  var playerRect = player.getBoundingClientRect();
  var npcRect = npc.getBoundingClientRect();
  if (checkCollision(playerRect, npcRect) && !isPlayerHit) {
    playerHitCount -= 1;
    playerHitIndicator.innerText = "Lives: ".concat(playerHitCount);
    isPlayerHit = true;
    setTimeout(function () {
      isPlayerHit = false;
    }, 2000); // 2 seconds delay

    if (playerHitCount <= 0) {
      alert('Game Over! The player has no live left.');
      // Add any additional game over logic here
    }
  }
  // Update NPC position
  npc.style.left = "".concat(Math.min(maxLeft, Math.max(0, npc.offsetLeft + moveX)), "px");

  // Update NPC animation
  if (moveX > 0) {
    npc.style.transform = 'translate(-50%, -50%) scaleX(1)'; // Normal orientation
  } else if (moveX < 0) {
    npc.style.transform = 'translate(-50%, -50%) scaleX(-1)'; // Mirrored orientation
  }

  animateNPC();
}
function checkCollision(rect1, rect2) {
  return rect1.left < rect2.right && rect1.right > rect2.left && rect1.top < rect2.bottom && rect1.bottom > rect2.top;
}
function shootProjectile() {
  var playerRect = player.getBoundingClientRect();
  var npcRect = npc.getBoundingClientRect();
  var gameContainerRect = document.querySelector('.game-container').getBoundingClientRect();
  var directionX = npcRect.left + npcRect.width / 2 - (playerRect.right - gameContainerRect.left);
  var directionY = npcRect.top + npcRect.height / 2 - (playerRect.top - gameContainerRect.top + playerRect.height / 2);
  var magnitude = Math.sqrt(directionX * directionX + directionY * directionY);
  var normalizedDirectionX = directionX / magnitude;
  var normalizedDirectionY = directionY / magnitude;

  // Adjust these values to change the starting location of the projectile
  var offsetX = -100; // Horizontal offset from the player's right edge
  var offsetY = -80; // Vertical offset from the player's center

  projectile.style.left = "".concat(playerRect.right - gameContainerRect.left + offsetX, "px");
  projectile.style.top = "".concat(playerRect.top - gameContainerRect.top + playerRect.height / 2 + offsetY, "px");
  projectile.style.display = 'block';
  isShooting = true;

  // Mirror the projectile image if moving from right to left
  if (normalizedDirectionX < 0) {
    projectile.style.transform = 'scaleX(-1)';
  } else {
    projectile.style.transform = 'scaleX(1)';
  }
  var projectileSpeed = 20; // Adjust speed as needed
  var projectileInterval = setInterval(function () {
    var newLeft = projectile.offsetLeft + normalizedDirectionX * projectileSpeed;
    var newTop = projectile.offsetTop + normalizedDirectionY * projectileSpeed;
    if (newLeft > gameContainerRect.width || newLeft < 0 || newTop > gameContainerRect.height || newTop < 0) {
      clearInterval(projectileInterval);
      projectile.style.display = 'none';
      isShooting = false;
    } else {
      projectile.style.left = "".concat(newLeft, "px");
      projectile.style.top = "".concat(newTop, "px");
    }
    var projectileRect = projectile.getBoundingClientRect();
    var npcRect = npc.getBoundingClientRect();
    if (checkCollision(projectileRect, npcRect)) {
      hitCount += 1;
      hitIndicator.innerText = "Hits 100/ ".concat(hitCount);
      projectile.style.display = 'none';
      clearInterval(projectileInterval);
      isShooting = false;
      if (hitCount >= 100) {
        alert('Game Over! The NPC has been hit 100 times.');
        // Add any additional game over logic here
      }
    }
  }, 25); // Adjust interval as needed for smooth animation
} // This closes the shootProjectile function

setInterval(followPlayer, 100); // Adjust interval as needed
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "46639" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.75da7f30.js.map