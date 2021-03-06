// Generated by CoffeeScript 1.9.3

(function() {
  angular.module('security', ['main', 'security.Device', 'security.DeviceGroup', 'security.Policy', 'security.SELog', 'security.App', 'security.AppGroup', 'security.Distribution']).config([
    '$routeProvider', function($routeProvider) {
      return $routeProvider.when('/device', {
        templateUrl: 'res/security/device/index.html',
        controller: 'DeviceController'
      }).when('/device/register', {
        templateUrl: 'res/security/device/register.html',
        controller: 'DeviceRegisterController'
      }).when('/device/:id/detail', {
        templateUrl: 'res/security/device/detail.html',
        controller: 'DeviceDetailController'
      }).when('/device/:id/bootInfo', {
        templateUrl: 'res/security/device/bootInfo.html',
        controller: 'DeviceBootInfoController'
      }).when('/deviceGroup', {
        templateUrl: 'res/security/deviceGroup/index.html',
        controller: 'DeviceGroupController'
      }).when('/deviceGroup/create', {
        templateUrl: 'res/security/deviceGroup/create.html',
        controller: 'DeviceGroupCreateController'
      }).when('/deviceGroup/:id/edit', {
        templateUrl: 'res/security/deviceGroup/edit.html',
        controller: 'DeviceGroupEditController'
      }).when('/deviceGroup/:id/detail', {
        templateUrl: 'res/security/deviceGroup/detail.html',
        controller: 'DeviceGroupDetailController'
      }).when('/appGroup', {
        templateUrl: 'res/security/appGroup/index.html',
        controller: 'AppGroupController'
      }).when('/app', {
        templateUrl: 'res/security/app/index.html',
        controller: 'AppController'
      }).when('/app/creator', {
        templateUrl: 'res/security/app/creator.html',
        controller: 'AppCreatorController'
      }).when('/app/:uuid/detail', {
        templateUrl: 'res/security/app/detail.html',
        controller: 'AppDetailController'
      }).when('/app/distribution', {
        templateUrl: 'res/security/app/distribution.html',
        controller: 'DistributionController'
      }).when('/distribution/progress', {
        templateUrl: 'res/security/distribution/progress.html',
        controller: 'DistributionProgressController'
      }).when('/firmware', {
        templateUrl: 'res/security/firmware/index.html',
        controller: 'FirmwareController'
      }).when('/blackList', {
        templateUrl: 'res/security/blackList/index.html',
        controller: 'BlackListController'
      }).otherwise({
        redirectTo: '/device'
      });
    }
  ]).service('DeviceService', [
    '$http', function($http) {
      return {
        register: function(device) {
          return $http.post("web/deviceClients/register", device);
        },
        unregister: function(id) {
          return $http.post("web/deviceClients/" + id + "/unregister", {});
        },
        recover: function(id) {
          return $http.post("web/deviceClients/" + id + "/recoverRegister", {});
        },
        detail: function(id) {
          return $http.get("web/deviceClients/" + id);
        },
        bootInfo: function(id) {
          return $http.get("web/deviceClients/" + id + "/bootInfo");
        },
        unBindDevice: function() {
          return $http.get("web/deviceClients/unbind");
        },
        bindDevice: function(id) {
          return $http.get("web/deviceClients/" + id + "/bind");
        },
        conStatus: function(uuids) {
          return $http.post("web/deviceClients/conStatus", {
            uuids: uuids
          });
        },
        wipeData: function(id) {
          return $http.post("web/deviceClients/" + id + "/wipeData", {});
        },
        reInit: function(id) {
          return $http.post("web/deviceClients/" + id + "/reInit", {});
        },
        uninstall: function(clients, apps) {
          return $http.post("web/deviceClients/uninstall", {
            clients: clients,
            apps: apps
          });
        },
        countByType: function() {
          return $http.get("web/deviceClients/countByType");
        },
        countByStatus: function() {
          return $http.get("web/deviceClients/countByStatus");
        }
      };
    }
  ]).service('AppService', [
    '$http', function($http) {
      return {
        save: function(androidApp) {
          return $http.post("web/app/create", androidApp);
        },
        detail: function(uuid) {
          return $http.get("web/app/" + uuid);
        },
        "delete": function(uuid) {
          return $http.post("web/app/" + uuid + "/delete", {});
        },
        publish: function(uuid) {
          return $http.post("web/app/" + uuid + "/publish", {});
        },
        chart: function() {
          return $http.get("web/app/chart");
        }
      };
    }
  ]).service('SecurityLogService', [
    '$http', function($http) {
      return {
        selog: function(params) {
          return $http.get("web/selog", {
            params: params
          });
        }
      };
    }
  ]).service('DeviceGroupService', [
    '$http', function($http) {
      return {
        create: function(deviceGroup) {
          return $http.post("web/deviceGroup/create", deviceGroup);
        },
        remove: function(uuids) {
          return $http.post("web/deviceGroup/delete", [].concat(uuids));
        },
        update: function(deviceGroup) {
          return $http.post("web/deviceGroup/update", deviceGroup);
        },
        detail: function(uuid) {
          return $http.get("web/deviceGroup/" + uuid);
        },
        list: function() {
          return $http.get("web/deviceGroup/list");
        },
        devices: function(uuid) {
          return $http.get("web/deviceGroup/" + uuid + "/devices");
        },
        dataForEdit: function(uuid) {
          return $http.get("web/deviceGroup/" + uuid + "/dataForEdit");
        }
      };
    }
  ]).service('AppGroupService', [
    '$http', function($http) {
      return {
        create: function(deviceGroup) {
          return $http.post("web/appGroup/create", deviceGroup);
        },
        remove: function(uuids) {
          return $http.post("web/appGroup/delete", [].concat(uuids));
        },
        update: function(deviceGroup) {
          return $http.post("web/appGroup/update", deviceGroup);
        },
        detail: function(uuid) {
          return $http.get("web/appGroup/" + uuid);
        },
        dataForEdit: function(uuid) {
          return $http.get("web/appGroup/" + uuid + "/dataForEdit");
        }
      };
    }
  ]);

}).call(this);
