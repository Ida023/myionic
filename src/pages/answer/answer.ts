import { Component } from '@angular/core';
import { NavController, NavParams,ViewController, LoadingController, ToastController } from 'ionic-angular';
import { BaseUI } from '../../common/baseui'
import { RestProvider } from '../../providers/rest/rest'
import {Storage} from '@ionic/storage'

/**import { RestProvider } from '../../providers/rest/rest'
 * Generated class for the AnswerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-answer',
  templateUrl: 'answer.html',
})
export class AnswerPage extends BaseUI {
  content: string;
  id: string;
  errorMessage: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public vieCtrl: ViewController,
    public rest:RestProvider,
    public loadingCtrl:LoadingController,
    public storage:Storage,
    public toastCtrl:ToastController
  ) {
    super();
  }

  ionViewDidLoad() {
     this.id=this.navParams.get('id');
  }
  dismiss() {
    this.vieCtrl.dismiss()
  }
  submit() {
     var loading=super.showLoading(this.loadingCtrl,'发表中')
     //this.rest.answer()
     this.storage.get('UserId').then(val=>{
       if(val!=null){
        this.rest.answer(val,this.id,this.content).subscribe(f=>{
          if(f['Status']=='OK'){
            loading.dismissAll();
            this.dismiss();
          }else{
            loading.dismissAll();
            super.showToast(this.toastCtrl,f['StatusContent']) 
          }
        },err=>this.errorMessage=<any>err)

       }else{
         super.showToast(this.toastCtrl,'请登录后发布提问...')
       }
     })
  }
}
