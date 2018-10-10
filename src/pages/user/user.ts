import { Component } from '@angular/core';
import { NavController, NavParams,ModalController,LoadingController, ToastController, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';
import {HeadfacePage} from '../headface/headface'
/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage extends BaseUI {
  headface:string='https://imoocqa.gugujiankong.com/users/5996953615f87ec629cff319.jpg';
  nickname:string="加载中..";
  errorMessage:any;
  
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public rest: RestProvider,
     public storage: Storage, 
      public modalCtrl: ModalController,
     public loadCtrl: LoadingController,
     public toastCtrl: ToastController,
     public viewCtrl:ViewController

    ) {
      super();
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad UserPage');
  }
  ionViewDidEnter() {
    this.loadUserPage();
  }
  logout(){
    this.storage.remove('UserId')
    this.viewCtrl.dismiss();
  }
  updateNickname(){
     this.storage.get('UserId').then((val)=>{
           if(val!=null){
             var loading=super.showLoading(this.loadCtrl,'修改中...');
             this.rest.updateNickname(val,this.nickname).subscribe(f=>{
               if(f['Status']=='OK'){
                 loading.dismiss();
                 super.showToast(this.toastCtrl,'昵称修改成功!')
               }
               else{
                loading.dismiss();
                super.showToast(this.toastCtrl,f['StatusContent'])
               }
             })
           }   
     })
  }
  gotoHeadFace(){
    this.navCtrl.push(HeadfacePage)
  }
  loadUserPage() {
    this.storage.get('UserId').then((val) => {
      if (val != null) {
        // 
        var loading = super.showLoading(this.loadCtrl, '加载中...')
        this.rest.getUserInfo(val).subscribe(userinfo => {
          this.nickname = userinfo['UserNickName'];
          this.headface = userinfo['UserHeadface'] + '?' + (new Date()).valueOf;
          loading.dismiss();
        },
        error=>this.errorMessage = <any>error
      );
      }
      else {
      }
    });
  }
}
