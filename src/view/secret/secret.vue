<template>
  <div>
    <div style="text-align: center">
      <h1><i>前后端的数据加密解密交互流程演示</i></h1>
    </div>
    <el-row :gutter="10">
      <el-form>
        <el-form-item>
          <h2>SM2</h2>
          <el-row>
            <el-col :span="2">
              <span style="font-size: 20px">
                <strong>私钥:</strong>
              </span>
            </el-col>
            <el-col :span="22">
              <el-input v-model="keypair.privkey" disabled></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="2">
              <span style="font-size: 20px">
                <strong>公钥:</strong>
              </span>
            </el-col>
            <el-col :span="22">
              <el-input v-model="keypair.publkey" disabled></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :offset="2">
              <el-button height="100%" @click="generateKeyPairs" >生成公钥</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="2">
              <span style="font-size: 20px">
                <strong>SM4密钥:</strong>
              </span>
            </el-col>
            <el-col :span="22">
              <el-input v-model="mainkey" disabled></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :offset="2">
              <el-button height="100%" @click="generateMainKey" >生成SM4密钥</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="2">
              <span style="font-size: 20px">
                <strong>SM2加密</strong>
              </span>
            </el-col>
            <el-col :span="22">
              <el-input v-model="encryptMainKey" disabled></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :offset="2">
              <el-button height="100%" @click="encryptKey" >加密SM4密钥</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="2">
              <span style="font-size: 20px">
                <strong>SM2解密</strong>
              </span>
            </el-col>
            <el-col :span="22">
              <el-input v-model="decryptMainKey" disabled></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :offset="2">
              <el-button height="100%" @click="decryptKey" >解密SM4密钥</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <h2>SM3</h2>
          <el-row :gutter="10">
            <el-col :span="2">
              <span style="font-size: 20px">
                <strong>message:</strong>
              </span>
            </el-col>
            <el-col :span="22">
              <el-input v-model="message"></el-input>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="2">
              <span style="font-size: 20px">
                <strong>summary:</strong>
              </span>
            </el-col>
            <el-col :span="22">
              <el-input v-model="summary" disabled></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :offset="2">
              <el-button height="100%" @click="getSummary">生成摘要</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <h2>SM4</h2>
          <el-row :gutter="10">
            <el-col :span="2">
              <span style="font-size: 20px">
                <strong>message:</strong>
              </span>
            </el-col>
            <el-col :span="22">
              <el-input v-model="message"></el-input>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="2">
              <span style="font-size: 20px">
                <strong>密钥:</strong>
              </span>
            </el-col>
            <el-col :span="22">
              <el-input v-model="mainkey" disabled></el-input>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="2">
              <span style="font-size: 20px">
                <strong>加密:</strong>
              </span>
            </el-col>
            <el-col :span="22">
              <el-input v-model="ciphertext" disabled></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :offset="2">
              <el-button type="primary" width=100% @click="encrypt">加密message</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="2">
              <span style="font-size: 20px">
                <strong>解密:</strong>
              </span>
            </el-col>
            <el-col :span="22">
              <el-input v-model="plaintext" disabled></el-input>
            </el-col>
          </el-row>
           <el-row>
            <el-col :offset="2">
              <el-button type="primary" width=100% @click="decrypt">解密ciphertext</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "secret",
  data() {
    return {
      keypair: {
        privkey: "",
        publkey: ""
      },
      message: '',
      summary: "",
      ciphertext: '',
      plaintext:'',
      mainkey:'',
      encryptMainKey:"",
      decryptMainKey:"",
      cipherMode: "0",
      
    };
  },
  methods: {
    generateKeyPairs() {
      let sm2 = "";
      let method = "SM2";
      let ec = new KJUR.crypto.ECDSA({ curve: method });
      let keypair = ec.generateKeyPairHex();
      this.keypair.privkey = keypair.ecprvhex;
      this.keypair.publkey = keypair.ecpubhex;
    },
    generateMainKey(){
      let key = randomkey("1ab21d8355cfa17f8e61194831e81a8f22bec8c728fefb747ed035eb5082aa2b");
      this.mainkey = key;
    },
    encryptKey(){
      let msgData = CryptoJS.enc.Utf8.parse(this.mainkey);
      let publkey = this.keypair.publkey+""
      if (publkey.length > 64 * 2) {
          publkey = publkey.substr(publkey.length - 64 * 2);
      }
      let xHex = publkey.substr(0, 64);
      let yHex = publkey.substr(64);
      let cipher = new SM2Cipher(this.cipherMode);
      let userKey = cipher.CreatePoint(xHex, yHex);
      msgData = cipher.GetWords(msgData.toString());
      let encryptData = cipher.Encrypt(userKey, msgData);
      this.encryptMainKey = encryptData;
    },
    decryptKey(){
      let privateKey = new BigInteger(this.keypair.privkey, 16);
      let cipher = new SM2Cipher(this.cipherMode);
      let data = cipher.Decrypt(privateKey, this.encryptMainKey);
      this.decryptMainKey = data      
    },
    getSummary(){
      let sm3 = "";
      const self = this;
      if(!self.message){
        this.$message("message不能为空")
        return
      }
      new Fingerprint2().get(function(result, components){
          let summary = CryptoJS.SM3(self.message).toString(CryptoJS.enc.Hex)
          self.summary = summary;
      });
    },
    encrypt(){
      let ciphertext = sm4_encode_cbc(this.message,this.mainkey);
      let result = "";
      for(let i = 0; i < ciphertext.length; i++){
          let hextext = ciphertext[i].toString(16);
          result += hextext.length == 16 ? hextext :"0".repeat(8-hextext.length) + hextext;
      }
      this.ciphertext = result;
    },
    decrypt(){
      let text = new Array();
      let result = this.ciphertext+"";
      for(let i = 0; i < result.length; i+=8){
          text.push(parseInt(result.slice(i, i + 8), 16))
      }
      let plaintext = sm4_decode_cbc(text,this.mainkey);
      this.plaintext = plaintext
    }
  },
  created() {}
};
</script>

<style>

</style>
