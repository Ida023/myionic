import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';
import { LoginPage } from '../login/login'



/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage extends BaseUI {
  mobile: any;
  nickname: any;
  password: any;
  confirmPassword: any;
  errorMessage: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public rest: RestProvider,
    public toastCtrl: ToastController
  ) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  dismiss() {
    this.viewCtrl.dismiss()
  }
  pushLoginPage() {
    this.navCtrl.pop()
  }
  doRegister() {
    //验证国内手机号码的格式
    
    if(!(/^1[34578]\d{9}$/.test(this.mobile))){
      super.showToast(this.toastCtrl, '您的手机号码格式不正确!')       
    }else if (this.nickname.length<3 || this.nickname.length>10 || this.password.length<6 || this.password.length>20 || this.confirmPassword.length<6 || this.confirmPassword.length>20){
      super.showToast(this.toastCtrl, '输入值格式不正确')
    }
    else if (this.confirmPassword === this.password) {
      super.showToast(this.toastCtrl, '俩次输入的密码不匹配')
    } else {
      var loading = super.showLoading(this.loadingCtrl, '注册中...');
      this.rest.register(this.mobile, this.nickname, this.password).subscribe((f) => {
        if (f['Status'] == 'OK') {
          loading.dismiss();
          super.showToast(this.toastCtrl, '注册成功');
          this.dismiss();
        } else {
          loading.dismiss();
          super.showToast(this.toastCtrl, f['StatusContent']);
        }
      },
        error => this.errorMessage = <any>error
      )
    }
  }
}
