<template>
  <div class="Table">
    <div class="filter-container">
      <el-input placeholder="请输入用户名" style="width: 200px" v-model="listQuery.username" ></el-input>
      <el-select placeholder="请选择健康状态" style="width: 150px" v-model="listQuery.status">
        <el-option v-for="(item, index) in statusOptions" :key="index" :value="item.type" :label="item.content"></el-option>
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      <el-button class="filter-item" type="primary" style="margin-left: 10px;" icon="el-icon-edit" @click="handleAdd">添加</el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-download" @click="handleExport">导出</el-button>
    </div>
    <el-table :data="Data" border fit highlight-current-row style="width:100%">
      <el-table-column width="60" align="center" label="ID">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column width="110" align="center" label="用户名">
        <template slot-scope="scope">
          <span>{{scope.row.username}}</span>
        </template>
      </el-table-column>
      <el-table-column width="180" align="center" label="电子邮件">
        <template slot-scope="scope">
          <span>{{scope.row.email}}</span>
        </template>
      </el-table-column>
      <el-table-column width="180" align="center" label="设备ID">
        <template slot-scope="scope">
          <span>{{scope.row.device}}</span>
        </template>
      </el-table-column>
      <el-table-column width="180" align="center" label="昨晚睡眠情况">
        <template slot-scope="scope">
          <span>{{scope.row.sleep}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100" align="center" label="健康状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status" size="small">{{scope.row.status | statusFilter}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button type="info" size="small" @click="detailUser(scope.row.id)">详情</el-button>
          <el-button type="danger " size="small" @click="handleDelete(scope.row)">删除</el-button>
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
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item required label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" auto-complete="off" suffix-icon="el-icon-date"></el-input>
        </el-form-item>
        <el-form-item required label="密码" :label-width="formLabelWidth">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item required label="确认密码" :label-width="formLabelWidth">
          <el-input type="password" v-model="form.Repassword"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="createUser">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑用户" :visible.sync="dialogEditVisible">
      <el-form :model="updateForm">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="updateForm.username" auto-complete="off" suffix-icon="el-icon-date"></el-input>
        </el-form-item>
        <el-form-item label="电子邮件" :label-width="formLabelWidth">
          <el-input type="email" v-model="updateForm.email"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateUser(updateForm)">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="查看用户" :visible.sync="dialogShowVisible" >
      <ul style=" list-style:none;font-size: 20px; text-align: center">
        <li>用户: {{userForm.username}}</li>
        <li>入睡时间: 23:24:00</li>
        <li>起床时间: 8:37:00</li>
        <li>心率: 75</li>
        <li>呼吸率: 19</li>
        <li>体动: 40</li>
        <li>评分: 86</li>
      </ul>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogShowVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogShowVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "user-info",
    data: function() {
      return {
        Data: [],
        dialogFormVisible: false,
        dialogEditVisible: false,
        dialogShowVisible: false,
        formLabelWidth: "100px",
        form:{},
        updateForm: {},
        userForm: {},
        listQuery: {
          username: undefined,
          page: 1,
          status: undefined,
        },
        total: 100,
        statusOptions: [
          {
            type: 'success',
            content: '健康',
          },
          {
            type: 'warning',
            content: '警告'
          },
          {
            type: 'danger',
            content: '危险'
          }
        ],
      };
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          success: '健康',
          warning: '异常',
          danger: '危险',
        };
        return statusMap[status]
      },
    },
    methods: {
      getData: function() {
        const self = this
        this.$http({
          url: "api/users/list/*",
          method: "Get",
          params: this.listQuery
        })
          .then(response => {
            self.Data = response.data.results
            self.total = response.data.total
          })
          .catch(function(error) {
            console.log(error);
          });
      },
      handleSearch: function () {
        const self = this
        this.listQuery.page = 1
        this.getData()
        console.log(JSON.stringify(this.listQuery, null, 2))
        this.Data.forEach(function (element) {
          console.log(element)
          element.status = self.listQuery.status
        })
        this.listQuery.username = ''
        this.listQuery.status = ''
      },
      handleAdd: function () {
        this.dialogFormVisible = true;
      },
      handleExport: function () {
        const self = this
        import('../../utils/export2excel').then( excel => {
          const tHeader = ['ID', '用户名', '电子邮件', '设备ID', '昨晚睡眠状态', '健康状态']
          const data = self.getTotalUsers()
          excel.export_json_to_excel(tHeader, data, 'users-list')
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
      handleDelete: function (userId) {
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then((resp) => {
          this.deleteUser(userId)
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
      handleUpdate: function (user) {
        this.dialogEditVisible = true
        this.updateForm = user
      },
      createUser: function () {
        const self = this
        if(!(this.form.password === this.form.Repassword))
        {
          this.$message({
            message: '添加失败',
            type: 'error',
            center: true
          });
          return
        }
        this.$http({
          url: '/api/users/create',
          method: 'Post',
          params: {
            username: this.form.username,
            password: this.form.password
          }
        }).then( (resp) => {
          if(resp.data === 'success'){
            self.dialogFormVisible = false;
            let user = {
              username: self.form.username,
              id: 11
            }
            self.Data.splice(0,1, user)
            console.log(self.form)
            self.$message({
              message: '添加成功',
              center: true
            });
          }
        }).catch(function (error) {
          self.dialogFormVisible = false;
          console.log(error);
          self.$message({
            message: '添加失败',
            type: 'error',
            center: true
          });
        })
      },
      updateUser: function (user) {
        const self = this
        this.$http({
          url: 'api/users/update',
          method: 'post',
          params:{
            id:this.updateForm.userId,
            username: this.updateForm.username,
            email: this.updateForm.email
          }
        }).then( (resp) => {
          if(resp.data === 'success'){
            for (const v of self.Data) {
              if (v.id === user.id) {
                v.username = user.username
                v.email = user.email
                break
              }
            }
            this.dialogEditVisible = false;
            this.$message({
              message: '修改成功',
              center: true,
              type: 'success'
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
      detailUser: function (userId) {
        this.dialogShowVisible = true
        this.userForm = this.Data[userId - 1]
      },
      deleteUser: function (row) {
        const self = this
        this.$http({
          url: 'api/users/delete/',
          method: 'get',
          params: {
            id:row.id
          }
        }).then((resp) => {
          const index = self.Data.indexOf(row)
          console.log(row)
          self.Data.splice(index, 1)
        }).catch( function (error) {
          console.log(error);
        })
      },
      getTotalUsers: function () {
        var data = []
        this.$http({
          url: 'api/users/lists/',
          method: 'get'
        }).then( (resp) => {
          const filterVal = ['id', 'username', 'email', 'device','sleep','status']
          for(let i = 0; i < resp.data.results.length; i++){
            let temp = []
            for(let j in filterVal){
              temp.push(resp.data.results[i][filterVal[j]]+"")
            }
            data.push(temp)
          }
        }).catch( function (error) {
          console.log(error);
        })
        return data
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