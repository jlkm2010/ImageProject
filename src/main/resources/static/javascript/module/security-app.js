// Generated by CoffeeScript 1.9.3

/*
Created by gota on 15-5-29.
 */

(function() {
  angular.module('security.App', ['main']).controller('AppController', [
    '$scope', '$modal', 'DTOptionsBuilder', 'DTColumnBuilder', 'AlertService', 'MyDTColumnBuilder', 'DataTableService', 'AppService', function($scope, $modal, DTOptionsBuilder, DTColumnBuilder, AlertService, MyDTColumnBuilder, DataTableService, AppService) {
      var actionsHtml, renderStatus, status;
      status = {
        PROCESSING: '<i class="fa fa-spinner fa-spin"></i> 处理中',
        SCAN_FAIL: '失效(扫描失败)',
        PACKAGE_FAIL: '失效(打包失败)',
        READY: '待发布',
        PUBLISHED: '已发布'
      };
      renderStatus = function(data, type, full, meta) {
        return "<span>" + status[data] + "</span>";
      };
      actionsHtml = function(data, type, full, meta) {
        var actions, btnDelete, btnDetail, btnPublish;
        btnDelete = "<button title='删除应用' ng-click='delete(\"" + data + "\")'><i class='fa fa-trash-o'></i></button>";
        btnPublish = "<button title='发布应用' ng-click='publish(\"" + data + "\")'><i class='fa fa-paper-plane'></i></button>";
        btnDetail = "<a title='应用详情' href='#/app/" + data + "/detail'><i class='fa fa-file-text-o'></i></a>";
        actions = [btnDelete, btnDetail];
        if (full.status === 'READY') {
          actions = actions.concat(btnPublish);
        }
        return actions.join('\n');
      };
      $scope.dtInstanceCallback = function(dtInstance) {
        $scope.dtInstance = dtInstance;
        return DataTableService.enableReload($scope, $scope.dtInstance);
      };
      $scope.dtOptions = DataTableService.getDefaultOptions({
        url: 'dt/androidApp',
        type: 'POST'
      }, $scope);
      $scope.dtColumns = [MyDTColumnBuilder.newColumn('name', '应用名称'), MyDTColumnBuilder.newColumn('status', '状态').renderWith(renderStatus), MyDTColumnBuilder.newColumn('DT_RowId', '操作').notSortable().renderWith(actionsHtml)];
      $scope["delete"] = function(uuid) {
        var promise;
        promise = AppService["delete"](uuid);
        return DataTableService.defaultHandle(promise, $scope.dtInstance, 'success', 'error');
      };
      return $scope.publish = function(uuid) {
        var promise;
        promise = AppService.publish(uuid);
        return DataTableService.defaultHandle(promise, $scope.dtInstance, 'success', 'error');
      };
    }
  ]).controller('AppCreatorController', [
    '$scope', '$location', 'AlertService', 'AppService', function($scope, $location, AlertService, AppService) {
      $scope.app = {};
      $scope.uploadOptions = {
        url: 'web/upload',
        autoUpload: true,
        done: function(e, data) {
          $scope.uploaded = true;
          $scope.file = data.files[0];
          $scope.fileRemote = data.result.files[0].name;
          return $scope.app.fileName = $scope.fileRemote;
        }
      };
      return $scope.save = function() {
        var promise;
        promise = AppService.save($scope.app);
        return AlertService.defaultHandle(promise, true);
      };
    }
  ]).controller('DistributionController', [
    '$scope', '$location', 'AlertService', 'AppDistributionService', function($scope, $location, AlertService, AppDistributionService) {
      $scope.data = {
        devices: [],
        apps: []
      };
      $scope.canDistribute = function() {
        var ref, ref1;
        return ((ref = $scope.data.devices) != null ? ref.length : void 0) > 0 && ((ref1 = $scope.data.apps) != null ? ref1.length : void 0) > 0;
      };
      $scope.distribute = function() {
        var app, appIds, device, deviceIds, promise;
        deviceIds = (function() {
          var i, len, ref, results;
          ref = $scope.data.devices;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            device = ref[i];
            results.push(device.uuid);
          }
          return results;
        })();
        appIds = (function() {
          var i, len, ref, results;
          ref = $scope.data.apps;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            app = ref[i];
            results.push(app.uuid);
          }
          return results;
        })();
        promise = AppDistributionService.distribute(deviceIds, appIds);
        AlertService.defaultHandle(promise, false);
        return promise.success(function() {
          return $location.path('/distribution/progress');
        });
      };
      return AppDistributionService.queryData().success(function(data) {
        $scope.deviceGroup = data.deviceGroup;
        return $scope.appGroup = data.appGroup;
      });
    }
  ]).controller('AppDetailController', [
    '$scope', '$routeParams', 'AppService', 'DTOptionsBuilder', 'DTColumnBuilder', 'MyDTColumnBuilder', 'DataTableService', function($scope, $routeParams, AppService, DTOptionsBuilder, DTColumnBuilder, MyDTColumnBuilder, DataTableService) {
      $scope.dtInstanceCallback = function(dtInstance) {
        $scope.dtInstance = dtInstance;
        return DataTableService.enableReload($scope, $scope.dtInstance);
      };
      $scope.dtOptions = DataTableService.getDefaultOptions({
        url: "dt/androidApp/" + $routeParams.uuid + "/components",
        type: 'POST'
      }, $scope);
      $scope.dtColumns = [MyDTColumnBuilder.newColumn('name', '名称'), MyDTColumnBuilder.newColumn('type', '类型'), MyDTColumnBuilder.newColumn('md5', 'MD5')];
      return AppService.detail($routeParams.uuid).success(function(data) {
        return $scope.app = data;
      });
    }
  ]).controller('AppChartController', [
    '$scope', 'AppService', 'WebSocketService', function($scope, AppService, WebSocketService) {
      $scope.chartConfigs = [
        {
          options: {
            chart: {
              type: 'column'
            }
          },
          series: [
            {
              "id": "app-count",
              name: "软件数量"
            }
          ],
          title: {
            text: '软件厂商'
          },
          size: {
            width: 300,
            height: 200
          },
          xAxis: {
            categories: []
          },
          yAxis: {
            allowDecimals: false,
            title: {
              text: ''
            }
          }
        }, {
          options: {
            chart: {
              type: 'pie'
            }
          },
          series: [
            {
              "id": "series-0",
              name: "终端数量"
            }
          ],
          title: {
            text: '软件状态'
          },
          size: {
            width: 300,
            height: 200
          }
        }
      ];
      WebSocketService.clear();
      return WebSocketService.subscribe('appChart', {}, function(data) {
        $scope.chartConfigs[0].xAxis.categories = JSON.parse(data.body).producerChart[0];
        $scope.chartConfigs[0].series[0].data = JSON.parse(data.body).producerChart[1];
        $scope.chartConfigs[1].series[0].data = JSON.parse(data.body).statusChart;
        return $scope.$apply();
      });
    }
  ]);

}).call(this);
