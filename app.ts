/// <reference path="typings/angularjs/angular.d.ts" />
module App{

  class DelegateService{

      public instances:any = {};

      constructor(){

      }

      public registerInstance(name: string, ctrl): void{

          this.instances[name || ''] = ctrl;
      }

      public deregisterInstance(name: string): void{

          delete this.instances[name || ''];
      }

      public getInstance(name: string){

          var _instance;
          if (!(_instance = this.instances[name || ''])) {
              throw "No instance with name " + name;
          }
          return _instance;
      }
  }


    class AppCtrl {

        private item;

        constructor(delegate){

            this.item= {name:'tst'}

            delegate.registerInstance('AppCtrl', this);
        }

        public onclick(){

            console.log('onclick appCtrl');
        }

    }

    class MainCtrl {

        private appCtrl;

        constructor(private delegate){

            this.appCtrl = this.delegate.getInstance('AppCtrl')
        }

        public onclick(){

            this.appCtrl.onclick();

            console.log(this.appCtrl);
        }

    }

    angular.module('app',[])

        .controller('appCtrl',AppCtrl)
        .controller('mainCtrl',MainCtrl)
        .service('delegate', DelegateService)
}
