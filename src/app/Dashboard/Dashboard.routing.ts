import { Routes } from '@angular/router';

import { ECommerceComponent } from './E-Commerce/E-Commerce.component';
import { WebAnalyticsComponent } from './WebAnalytics/WebAnalytics.component';
import { PlayerserachComponent } from './playerserach/playerserach.component';
import { PlayerShelfInquiriesComponent } from './player-shelf-inquiries/player-shelf-inquiries.component';
import { PlayerUpdateComponent } from './player-update/player-update.component';
import { RefreshlistComponent } from './refreshlist/refreshlist.component';
import { RefreshlistdetailsComponent } from './refreshlistdetails/refreshlistdetails.component';
import { AuditionsComponent } from './auditions/auditions.component';
import { AddAuditionComponent } from './add-audition/add-audition.component';
import { CastermessageComponent } from './castermessage/castermessage.component';
import { NewbandComponent } from './newband/newband.component';
import { CastingnewsComponent } from './castingnews/castingnews.component';
import { InsertcastingnewsComponent } from './insertcastingnews/insertcastingnews.component';
import { FaqComponent } from './faq/faq.component';
import { InsertfaqComponent } from './insertfaq/insertfaq.component';
import { DefaultComponent } from './default/default.component';
import { InsertdefaultComponent } from './insertdefault/insertdefault.component';
import { SitenewsComponent } from './sitenews/sitenews.component';
import { InsertsitenewsComponent } from './insertsitenews/insertsitenews.component';
import { CasterComponent } from './caster/caster.component';
import { PhysicalfeatureComponent } from './physicalfeature/physicalfeature.component';
import { PhysicalfeatureupdateComponent } from './physicalfeatureupdate/physicalfeatureupdate.component';
import { CharvaluesComponent } from './charvalues/charvalues.component';
import { UpdatecharvaluesComponent } from './updatecharvalues/updatecharvalues.component';
import { PropsComponent } from './props/props.component';
import { InsertpropsComponent } from './insertprops/insertprops.component';
import { UpdatepropsComponent } from './updateprops/updateprops.component';
import { AuditiontypeComponent } from './auditiontype/auditiontype.component';
import { InsertauditiontypeComponent } from './insertauditiontype/insertauditiontype.component';
import { TypeofmanuyComponent } from './typeofmanuy/typeofmanuy.component';
import { AgencyComponent } from './agency/agency.component';
import { InsertagencyComponent } from './insertagency/insertagency.component';
import { SendsmsComponent } from './sendsms/sendsms.component';
import { LogninotificationComponent } from './logninotification/logninotification.component';
import { AuditiontopicComponent } from './auditiontopic/auditiontopic.component';
import { InsertauditiontopicComponent } from './insertauditiontopic/insertauditiontopic.component';
import { InsertphysicalfeatureComponent } from './insertphysicalfeature/insertphysicalfeature.component';
import { AddvaluephysicalfeatureComponent } from './addvaluephysicalfeature/addvaluephysicalfeature.component';
import { ArtistmsgComponent } from './artistmsg/artistmsg.component';
// import { VideoplayersComponent } from './videoplayers/videoplayers.component';
import { AddartistmsgComponent } from './addartistmsg/addartistmsg.component';
import { CasterviewComponent } from './casterview/casterview.component';
import { InvitationComponent } from './invitation/invitation.component';
import { AgencyrankComponent } from './agencyrank/agencyrank.component';
import { ViewartistforrolesComponent } from './viewartistforroles/viewartistforroles.component';

export const DashboardRoutes: Routes = [
   {
      path: '',
      // redirectTo: 'ecommerce',
      redirectTo: 'refreshlist',
      pathMatch: 'full',
   },
   {
      path: '',
      children: [
         {
            path: 'refreshlist',
            component: RefreshlistComponent,
            data: {
               breadcrumb: 'Home'
            }
         },
         {
            path: 'ecommerce',
            component: ECommerceComponent
         },
         {
            path: 'addplayer',
            component: WebAnalyticsComponent,
            data: {
               breadcrumb: 'Add Actor'
            }
         },
         {
            path: 'playerserach',
            component: PlayerserachComponent,
            data: {
               breadcrumb: 'Search for Actor',
               shouldReuse: true
            }
         },
         {
            path: 'ActorsMessages',
            component: PlayerShelfInquiriesComponent,
            data: {
               breadcrumb: 'Actors Messages'
            }
         },
         {
            path: 'playerupdate',
            component: PlayerUpdateComponent,
            data: {
               breadcrumb: 'Actor update'
            }
         },
         {
            path: 'refreshlistdetails/:id',
            component: RefreshlistdetailsComponent,
            data: {
               breadcrumb: 'Notifcation detail'
            }
         },
         {
            path: 'auditions',
            component: AuditionsComponent,
            data: {
               breadcrumb: 'Auditions List',
               shouldReuse: true
            }
         },
         {
            path: 'addaudition',
            component: AddAuditionComponent,
            data: {
               breadcrumb: 'Add Audition'
            }
         },
         {
            path: 'addaudition/:id',
            component: AddAuditionComponent,
            data: {
               breadcrumb: 'Update Audition'
            }
         },
         {
            path: 'castermessage',
            component: CastermessageComponent,
            data: {
               breadcrumb: 'Casting Directors Messages'
            }
         },
         {
            path: 'newband/:id',
            component: NewbandComponent,
            data: {
               breadcrumb: 'Update Casting Director'
            }
         },
         {
            path: 'newband',
            component: NewbandComponent,
            data: {
               breadcrumb: 'Add Casting Director'
            }
         },
         {
            path: 'castingnews',
            component: CastingnewsComponent,
            data: {
               breadcrumb: 'Last Castings List'
            }
         },
         {
            path: 'insertcastingnews/:id',
            component: InsertcastingnewsComponent,
            data: {
               breadcrumb: 'Update Last Casting'
            }
         },

         {
            path: 'insertcastingnews',
            component: InsertcastingnewsComponent,
            data: {
               breadcrumb: 'Add Last Castings'
            }
         },
         {
            path: 'faq',
            component: FaqComponent,
            data: {
               breadcrumb: 'Questions And Answers List'
            }
         },
         {
            path: 'insertfaq',
            component: InsertfaqComponent,
            data: {
               breadcrumb: 'Add Questions And Answers'
            }
         },
         {
            path: 'insertfaq/:id',
            component: InsertfaqComponent,
            data: {
               breadcrumb: 'Update Questions And Answers'
            }
         },
         {
            path: 'default',
            component: DefaultComponent,
            data: {
               breadcrumb: 'Monologues Text List'
            }
         },
         {
            path: 'insertdefault',
            component: InsertdefaultComponent,
            data: {
               breadcrumb: 'Add Monologues Text'
            }
         },
         {
            path: 'insertdefault/:id',
            component: InsertdefaultComponent,
            data: {
               breadcrumb: 'Update Monologues Text'
            }
         },
         {
            path: 'sitenews',
            component: SitenewsComponent,
            data: {
               breadcrumb: 'News List'
            }
         },
         {
            path: 'insertsitenews',
            component: InsertsitenewsComponent,
            data: {
               breadcrumb: 'Add news'
            }
         },
         {
            path: 'insertsitenews/:id',
            component: InsertsitenewsComponent,
            data: {
               breadcrumb: 'Update news'
            }
         },
         {
            path: 'caster',
            component: CasterComponent,
            data: {
               breadcrumb: 'Casting Directors List'
            }
         },
         {
            path: 'physicalfeature',
            component: PhysicalfeatureComponent,
            data: {
               breadcrumb: 'Actor Physical Features'
            }
         },
         {
            path: 'physicalfeatureupdate',
            component: PhysicalfeatureupdateComponent
         },
         {
            path: 'charvalues',
            component: CharvaluesComponent
         },
         {
            path: 'updatecharvalues',
            component: UpdatecharvaluesComponent
         },
         {
            path: 'props',
            component: PropsComponent,
            data: {
               breadcrumb: 'Actor Additional abilities'
            }
         },
         {
            path: 'insertprops',
            component: InsertpropsComponent
         },
         {
            path: 'updateprops',
            component: UpdatepropsComponent
         },
         {
            path: 'auditiontype',
            component: AuditiontypeComponent,
            data: {
               breadcrumb: 'Audition Types'
            }
         },
         {
            path: 'insertauditiontype',
            component: InsertauditiontypeComponent
         },
         {
            path: 'typeofmanuy',
            component: TypeofmanuyComponent,
            data: {
               breadcrumb: 'Actor Subscription types'
            }
         },
         {
            path: 'logninotification',
            component: LogninotificationComponent,
            data: {
               breadcrumb: 'SMS Alerts to subscribers'
            }
         },
         {
            path: 'sendsms',
            component: SendsmsComponent,
            data: {
               breadcrumb: 'Send personalized SMS'
            }
         },
         {
            path: 'agency',
            component: AgencyComponent,
            data: {
               breadcrumb: 'Agencies'
            }
         },
         {
            path: 'AgencyRank',
            component: AgencyrankComponent,
            data: {
               breadcrumb: 'Agency Ranks'
            }
         },
         {
            path: 'insertangency',
            component: InsertagencyComponent,
            data: {
               breadcrumb: 'Add agency'
            }
         },
         {
            path: 'auditiontopic',
            component: AuditiontopicComponent,
            data: {
               breadcrumb: 'Audition topics'
            }
         },
         {
            path: 'insertauditiontopic',
            component: InsertauditiontopicComponent
         },
         {
            path: 'insertphysicalfeature',
            component: InsertphysicalfeatureComponent
         },
         {
            path: 'addvaluephysicalfeature',
            component: AddvaluephysicalfeatureComponent
         },
         {
            path: 'artistmsg',
            component: ArtistmsgComponent,
            data: {
               breadcrumb: 'Messages list'
            }
         },
         {
            path: 'addmessage',
            component: AddartistmsgComponent,
            data: {
               breadcrumb: 'Add Message'
            }
         },
         {
            path: 'addmessage/:id',
            component: AddartistmsgComponent,
            data: {
               breadcrumb: 'Update Message'
            }
         },
         // {
         //    path: 'videdoplayers',
         //    component: VideoplayersComponent
         // },
         {
            path: 'casterview',
            component: CasterviewComponent,
            data: {
               breadcrumb: 'CasterView'
            }
         },
         {
            path: 'invitation/:id',
            component: InvitationComponent,
            data: {
               breadcrumb: 'Registrations'
            }
         },
         {
            path: 'ViewArtists',
            component: ViewartistforrolesComponent,
            data: {
               breadcrumb: 'View Artists'
            }
         }
      ]
   }
];