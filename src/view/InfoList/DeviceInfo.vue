<template>
  <div class="Table">
    <div class="filter-container">
      <el-input placeholder="请输入用户名" style="width: 200px" v-model="listQuery.username" ></el-input>
      <el-select placeholder="请选择设备状态" style="width: 150px" v-model="listQuery.status">
        <el-option v-for="(item, index) in statusOptions" :key="index" :value="item.type" :label="item.content"></el-option>
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      <el-button class="filter-item" type="primary" style="margin-left: 10px;" icon="el-icon-edit" @click="handleAdd">添加</el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-download" @click="handleExport">导出</el-button>
    </div>
    <el-table :data="Data" border fit highlight-current-row style="width:100%">
      <el-table-column width="180" align="center" label="设备ID">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column width="110" align="center" label="所属用户">
        <template slot-scope="scope">
          <span>{{scope.row.username}}</span>
        </template>
      </el-table-column>
      <el-table-column width="180" align="center" label="绑定日期">
        <template slot-scope="scope">
          <span>{{scope.row.createdTime}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100" align="center" label="设备状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status" size="small">{{scope.row.status | statusFilter}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleUpdate(scope.row)">编辑</el-button>
          <!--<el-button type="info" size="small" @click="detailUser(scope.row.id)">详情</el-button>-->
          <el-button type="danger " size="small" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page="listQuery.page"
        :page-size="10"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog title="添加设备" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item required label="设备ID" :label-width="formLabelWidth">
          <el-input v-model="form.id" auto-complete="off" suffix-icon="el-icon-date"></el-input>
        </el-form-item>
        <el-form-item required label="用户名" :label-width="formLabelWidth">
          <el-input type="password" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item required label="绑定日期" :label-width="formLabelWidth">
          <el-date-picker type="datetime" placeholder="选择日期时间" v-model="form.createdTime"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="createDevice">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑设备" :visible.sync="dialogEditVisible">
      <el-form :model="updateForm">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="updateForm.username" auto-complete="off" suffix-icon="el-icon-date"></el-input>
        </el-form-item>
        <el-form-item label="绑定日期" :label-width="formLabelWidth">
          <el-date-picker type="datetime" placeholder="选择日期时间" v-model="updateForm.createdTime"></el-date-picker>
        </el-form-item>
        <el-form-item label="设备状态" :label-width="formLabelWidth">
          <el-select placeholder="请选择设备状态" style="width: 150px" v-model="updateForm.status">
            <el-option v-for="(item, index) in statusOptions" :key="index" :value="item.type" :label="item.content"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateDevice">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "device-info",
    data: function() {
      return {
        Data: [],
        dialogFormVisible: false,
        dialogEditVisible: false,
        formLabelWidth: "100px",
        form:{},
        updateForm: {},
        listQuery: {
          username: undefined,
          page: 1,
          status: undefined,
        },
        total: 100,
        statusOptions: [
          {
            type: 'success',
            content: '正常',
          },
          {
            type: 'warning',
            content: '异常'
          },
          {
            type: 'danger',
            content: '故障'
          }
        ],
      };
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          success: '正常',
          warning: '异常',
          danger: '故障',
        };
        return statusMap[status]
      },
    },
    methods: {
      getData: function() {
        this.$http({
          url: "api/devices/list/*",
          method: "Get",
          params: this.listQuery
        })
          .then(response => {
            this.Data.push(response.data.results[0])
            // this.total = response.data.total
            this.total = 1
          })
          .catch(function(error) {
            console.log(error)
            this.$message({
              massage: '获取设备数据失败',
              type: 'warning'
            })
          });
      },
      handleSearch: function () {
        let temp = []
        for(let i = 0; i < this.Data.length; i++)
        {
          if(this.listQuery.status && this.listQuery.username){
            if(this.Data[i].status === this.listQuery.status && this.Data[i].username === this.listQuery.username)
            {
              temp.push(this.Data[i])
              continue
            } 
          }
          else if(this.listQuery.status)
          {
            if(this.Data[i].status === this.listQuery.status){
              temp.push(this.Data[i])
              continue
            }
          }
          else if(this.listQuery.username)
          {
            if(this.Data[i].username === this.listQuery.username)
            {
              temp.push(this.Data[i])
              continue
            }
          }
          else{
            this.getData()
            return 
          }
        }
        
        this.Data = temp
        this.total = temp.length
        this.listQuery.status = ''
        this.listQuery.username = ''
      },
      handleAdd: function () {
        this.dialogFormVisible = true;
      },
      handleExport: function () {
        //TODO: get it finish
        const self = this
        import('../../utils/export2excel').then( excel => {
          const tHeader = ['设备ID', '所属用户', '绑定日期', '设备状态']
          const data = self.getTotalDevices()
          console.log(data)
          excel.export_json_to_excel(tHeader, data, 'table-list')
        }).catch(function (error) {
          console.log(error);
          self.$message({
            type: 'warning',
            message: '导出失败'
          })
        })
      },
      handleCurrentChange: function (val) {
        this.listQuery.page = val;
        this.getData();
      },
      handleDelete: function (deviceId) {
        this.$confirm('此操作将永久删除该设备, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then((resp) => {
          this.deleteDevice(deviceId)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除!'
          });
        });
      },
      handleUpdate: function (device) {
        this.dialogEditVisible = true
        this.updateForm.username = device.username
        this.updateForm.createdTime = device.createdTime
        this.updateForm.status = device.status
      },
      createDevice: function () {
        this.$message({
          message: '添加失败',
          type: 'error',
          center: true
        });
        this.$http({
          url: '/api/devices/create',
          method: 'Post',
          params: {
            id: this.form.id,
            username: this.form.username,
            createdTime: this.form.createdTime
          }
        }).then( (resp) => {
          if(resp.data === 'success'){
            this.dialogFormVisible = false;
            this.$message({
              message: '添加成功',
              center: true
            });
          }
        }).catch(function (error) {
          this.dialogFormVisible = false;
          console.log(error);
          this.$message({
            message: '添加失败',
            type: 'error',
            center: true
          });
        })
      },
      updateDevice: function () {
        this.$http({
          url: 'api/devices/update',
          method: 'post',
          params:{
            id:this.updateForm.Id,
            username: this.updateForm.username,
            createdTime: this.updateForm.createdTime
          }
        }).then( (resp) => {
          if(resp.data === 'success'){
            this.dialogEditVisible = false;
            this.$message({
              message: '修改成功',
              center: true
            });
          }
        }).catch( function (error) {
          this.dialogEditVisible = false;
          console.log(error);
          this.$message({
            message: '修改失败',
            type: 'error',
            center: true
          });
        })
      },
      deleteDevice: function (deviceId) {
        this.$http({
          url: 'api/devices/delete/',
          method: 'get',
          params: {
            id:deviceId
          }
        }).then((resp) => {

        }).catch( function (error) {
          console.log(error);
        })
      },
      getTotalDevices: function () {
        var data = []
        this.$http({
          url: 'api/devices/lists/',
          method: 'get'
        }).then( (resp) => {
          const filterVal = ['id', 'username', 'createdTime', 'status']
          for(let i = 0; i < resp.data.results.length; i++){
            let temp = []
            for(let j in filterVal){
              temp.push(resp.data.results[i][filterVal[j]]+"")
            }
            data.push(temp)
          }
          console.log(data)
          return data
        }).catch( function (error) {
          console.log(error);
        })
      }
    },
    created: function() {
      this.getData();
    }
  };
</script>

<style scoped>
  .filter-container{
    margin: 20px auto;
  }
  .filter-item{
    display: inline-block;
    vertical-align: middle;
    text-align: center;
    margin-left:10px
  }
  .pagination-container{
    margin-top: 10px
  }
</style>