/// <reference path="typings/angularjs/angular.d.ts" />
var App;
(function (App) {
    var DelegateService = (function () {
        function DelegateService() {
            this.instances = {};
        }
        DelegateService.prototype.registerInstance = function (name, ctrl) {
            this.instances[name || ''] = ctrl;
        };
        DelegateService.prototype.deregisterInstance = function (name) {
            delete this.instances[name || ''];
        };
        DelegateService.prototype.getInstance = function (name) {
            var _instance;
            if (!(_instance = this.instances[name || ''])) {
                throw "No instance with name " + name;
            }
            return _instance;
        };
        return DelegateService;
    })();
    var AppCtrl = (function () {
        function AppCtrl(delegate) {
            this.item = { name: 'tst' };
            delegate.registerInstance('AppCtrl', this);
        }
        AppCtrl.prototype.onclick = function () {
            console.log('onclick appCtrl');
        };
        return AppCtrl;
    })();
    var MainCtrl = (function () {
        function MainCtrl(delegate) {
            this.delegate = delegate;
            this.appCtrl = this.delegate.getInstance('AppCtrl');
        }
        MainCtrl.prototype.onclick = function () {
            this.appCtrl.onclick();
            console.log(this.appCtrl);
        };
        return MainCtrl;
    })();
    angular.module('app', []).controller('appCtrl', AppCtrl).controller('mainCtrl', MainCtrl).service('delegate', DelegateService);
})(App || (App = {}));
//# sourceMappingURL=app.js.map