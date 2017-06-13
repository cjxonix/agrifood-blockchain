import {Component}    from '@angular/core';
import { AppComponent } from "../../app.component";
import {Accreditation, Authorization, Message} from "../../types";
import {SharedService} from "../../services/shared.service";
import {ChainService} from "../../services/chain.service";

@Component({
  moduleId: module.id,
  selector: 'granted-authorizations',
  templateUrl: 'granted-authorizations.component.html'
})
export class GrantedAuthorizationsComponent extends AppComponent{
  private authorizations:Authorization[];
  private msg:Message;

  constructor(private sharedSrv:SharedService,private chainService:ChainService) {
    super(sharedSrv);
  };

  OnInitialized():void {
    // get granted authorizations
    this.chainService.get_granted_authorizations(this.enrolledId).then(result => {
      this.authorizations = result as Authorization[];

      if(this.authorizations){
        this.authorizations.forEach((auth,idx) => {
          this.chainService.get_accreditation(auth.AccreditationID).then(result => {
            this.authorizations[idx].Accreditation = result as Accreditation;
          });
        });
      }

      if(!this.authorizations || (this.authorizations && this.authorizations.length == 0)) {
        this.msg = {text:"No authorizations found", level:"alert-info"}
      }
    });
  }

}
