import { Injectable } from '@angular/core';

export interface MenuItems {
   state?: string;
   name: string;
   type: string;
   icon: string;
   class: string;
   children?: MenuItems[];
   isOpen?: boolean;
   isFirst?: boolean;
}

// const MENUITEMS = [
//    {
//       type: 'sub',
//       class: 'group-title',
//       icon: '',
//       isOpen: true,
//       isFirst: true,
//       children: [
//          {
//             state: 'dashboard',
//             name: 'Actors',
//             type: 'subChild',
//             class: 'nav-item',
//             icon: 'person',
//             isOpen: true,
//             children: [
//                { state: 'playerserach', name: 'Search for Actors', type: 'link', class: 'list-item child-item' },
//                { state: 'addplayer', name: 'Add Actor ', type: 'link', class: 'list-item child-item' },
//                { state: 'playershelfenquiries', name: 'Actors Messages', type: 'link', class: 'list-item child-item' }

//             ]
//          },
//          {
//             state: 'dashboard',
//             name: 'Auditions system',
//             type: 'subChild',
//             class: 'nav-item',
//             icon: 'settings_system_daydream',
//             isOpen: true,
//             children: [
//                { state: 'auditions', name: 'Auditions List', type: 'link', class: 'list-item child-item' },
//                { state: 'addaudition', name: 'Add Audition', type: 'link', class: 'list-item child-item' },
//                { state: 'castermessage', name: 'Casting Directors Messages', type: 'link', class: 'list-item child-item' }
//             ]
//          },
//          {
//             state: 'dashboard',
//             name: 'Messages system',
//             type: 'subChild',
//             class: 'nav-item',
//             icon: 'message',
//             children: [
//                { state: 'artistmsg', name: 'Messages list', type: 'link', class: 'list-item child-item' },
//                { state: 'addmessage', name: 'Add Message', type: 'link', class: 'list-item child-item' }
//             ]
//          },
//          {
//             state: 'dashboard',
//             name: 'Last castings',
//             type: 'subChild',
//             class: 'nav-item',
//             icon: 'cast',
//             isOpen: true,
//             children: [
//                { state: 'castingnews', name: 'Last Castings List', type: 'link', class: 'list-item child-item' },
//                { state: 'insertcastingnews', name: 'Add Last Casting', type: 'link', class: 'list-item child-item' }
//             ]
//          },
//          {
//             state: 'dashboard',
//             name: 'Questions and Answers',
//             type: 'subChild',
//             class: 'nav-item',
//             icon: 'question_answer',
//             children: [
//                { state: 'faq', name: 'Questions And Answers List', type: 'link', class: 'list-item child-item' },
//                { state: 'insertfaq', name: 'Add Questions And Answers', type: 'link', class: 'list-item child-item' }
//             ]
//          }
//       ]
//    },
//    {
//       type: 'sub',
//       class: 'group-title',
//       icon: '',
//       isOpen: true,
//       children: [
//          {
//             state: 'dashboard',
//             name: 'Monologues Text',
//             type: 'subChild',
//             class: 'nav-item',
//             icon: 'textsms',
//             children: [
//                { state: 'default', name: 'Monologues Text List', type: 'link', class: 'list-item child-item' },
//                { state: 'insertdefault', name: 'Add Monologues Text', type: 'link', class: 'list-item child-item' },
//             ]
//          },
//          {
//             state: 'dashboard',
//             name: 'News',
//             type: 'subChild',
//             class: 'nav-item',
//             icon: 'description',
//             children: [
//                { state: 'sitenews', name: 'News List', type: 'link', class: 'list-item child-item' },
//                { state: 'insertsitenews', name: 'Add News', type: 'link', class: 'list-item child-item' },
//             ]
//          },
//          {
//             state: 'dashboard',
//             name: 'Casting directors',
//             type: 'subChild',
//             class: 'nav-item',
//             icon: 'donut_large',
//             children: [
//                { state: 'caster', name: 'Casting Directors List', type: 'link', class: 'list-item child-item' },
//                { state: 'newband', name: 'Add Casting director', type: 'link', class: 'list-item child-item' }
//             ]
//          },
//          {
//             state: 'dashboard',
//             name: 'general',
//             type: 'subChild',
//             class: 'nav-item',
//             icon: 'flag',
//             children: [
//                { state: 'physicalfeature', name: 'Actor Physical Features', type: 'link', class: 'list-item child-item' },
//                { state: 'props', name: 'Actor Additional abilities', type: 'link', class: 'list-item child-item' },
//                { state: 'typeofmanuy', name: 'Actor Subscription types', type: 'link', class: 'list-item child-item' },
//                { state: 'auditiontype', name: 'Audition Types', type: 'link', class: 'list-item child-item' },
//                { state: 'auditiontopic', name: 'Audition sub types', type: 'link', class: 'list-item child-item' },
//                // { state: 'agency', name: 'Agencies', type: 'link', class: 'list-item child-item' }

//             ]
//          },
//          {
//             state: 'dashboard',
//             name: 'Agencies',
//             type: 'subChild',
//             class: 'nav-item',
//             icon: 'description',
//             children: [
//                { state: 'agency', name: 'Agencies', type: 'link', class: 'list-item child-item' },
//                { state: 'AgencyRank', name: 'Agency Ranks', type: 'link', class: 'list-item child-item' }
//             ]
//          },
//          {
//             state: 'dashboard',
//             name: 'SMS',
//             type: 'subChild',
//             class: 'nav-item',
//             icon: 'grid_on',
//             children: [
//                { state: 'sendsms', name: 'Send personalized SMS', type: 'link', class: 'list-item child-item' },
//                { state: 'logninotification', name: 'SMS Alerts to subscribers', type: 'link', class: 'list-item child-item' }
//             ]
//          }
//       ]
//    }
// ]

const MENUITEMS = [
   {
      type: 'sub',
      class: 'group-title',
      icon: '',
      isOpen: true,
      isFirst: true,
      children: [
         {
            state: 'dashboard',
            name: 'Actors',
            type: 'subChild',
            class: 'nav-item',
            icon: 'person',
            isOpen: true,
            children: [
               { state: 'playerserach', name: 'Search for Actors', type: 'link', class: 'list-item child-item' },
               { state: 'addplayer', name: 'Add Actor', type: 'link', class: 'list-item child-item' },
               { state: 'ActorsMessages', name: 'Actors Messages', type: 'link', class: 'list-item child-item' }

            ]
         },
         {
            state: 'dashboard',
            name: 'Auditions system',
            type: 'subChild',
            class: 'nav-item',
            icon: 'settings_system_daydream',
            isOpen: true,
            children: [
               { state: 'auditions', name: 'Auditions List', type: 'link', class: 'list-item child-item' },
               { state: 'addaudition', name: 'Add Audition', type: 'link', class: 'list-item child-item' },
               { state: 'castermessage', name: 'Casting Directors Messages', type: 'link', class: 'list-item child-item' }
            ]
         },
         {
            state: 'dashboard',
            name: 'Messages system',
            type: 'subChild',
            class: 'nav-item',
            icon: 'message',
            isOpen: true,
            children: [
               { state: 'artistmsg', name: 'Messages list', type: 'link', class: 'list-item child-item' },
               { state: 'addmessage', name: 'Add Message', type: 'link', class: 'list-item child-item' }
            ]
         },
         {
            state: 'dashboard',
            name: 'Last castings',
            type: 'subChild',
            class: 'nav-item',
            icon: 'cast',
            isOpen: true,
            children: [
               { state: 'castingnews', name: 'Last Castings List', type: 'link', class: 'list-item child-item' },
               { state: 'insertcastingnews', name: 'Add Last Casting', type: 'link', class: 'list-item child-item' }
            ]
         },
         {
            state: 'dashboard',
            name: 'Questions and Answers',
            type: 'subChild',
            class: 'nav-item',
            isOpen: true,
            icon: 'question_answer',
            children: [
               { state: 'faq', name: 'Questions And Answers List', type: 'link', class: 'list-item child-item' },
               { state: 'insertfaq', name: 'Add Questions And Answers', type: 'link', class: 'list-item child-item' }
            ]
         },
         {
            state: 'dashboard',
            name: 'Monologues Text',
            type: 'subChild',
            class: 'nav-item',
            isOpen: true,
            icon: 'textsms',
            children: [
               { state: 'default', name: 'Monologues Text List', type: 'link', class: 'list-item child-item' },
               { state: 'insertdefault', name: 'Add Monologues Text', type: 'link', class: 'list-item child-item' },
            ]
         },
         {
            state: 'dashboard',
            name: 'News',
            type: 'subChild',
            class: 'nav-item',
            isOpen: true,
            icon: 'description',
            children: [
               { state: 'sitenews', name: 'News List', type: 'link', class: 'list-item child-item' },
               { state: 'insertsitenews', name: 'Add News', type: 'link', class: 'list-item child-item' },
            ]
         },
         {
            state: 'dashboard',
            name: 'Casting directors',
            type: 'subChild',
            class: 'nav-item',
            isOpen: true,
            icon: 'donut_large',
            children: [
               { state: 'caster', name: 'Casting Directors List', type: 'link', class: 'list-item child-item' },
               { state: 'newband', name: 'Add Casting director', type: 'link', class: 'list-item child-item' }
            ]
         },
         {
            state: 'dashboard',
            name: 'general',
            type: 'subChild',
            class: 'nav-item',
            isOpen: true,
            icon: 'flag',
            children: [
               { state: 'physicalfeature', name: 'Actor Physical Features', type: 'link', class: 'list-item child-item' },
               { state: 'props', name: 'Actor Additional abilities', type: 'link', class: 'list-item child-item' },
               { state: 'typeofmanuy', name: 'Actor Subscription types', type: 'link', class: 'list-item child-item' },
               { state: 'auditiontype', name: 'Audition Types', type: 'link', class: 'list-item child-item' },
               { state: 'auditiontopic', name: 'Audition sub types', type: 'link', class: 'list-item child-item' }
            ]
         },
         {
            state: 'dashboard',
            name: 'Agencies',
            type: 'subChild',
            class: 'nav-item',
            isOpen: true,
            icon: 'description',
            children: [
               { state: 'agency', name: 'Agencies', type: 'link', class: 'list-item child-item' },
               { state: 'AgencyRank', name: 'Agency Ranks', type: 'link', class: 'list-item child-item' }
            ]
         },
         {
            state: 'dashboard',
            name: 'SMS',
            type: 'subChild',
            isOpen: true,
            class: 'nav-item',
            icon: 'grid_on',
            children: [
               { state: 'sendsms', name: 'Send personalized SMS', type: 'link', class: 'list-item child-item' },
               { state: 'logninotification', name: 'SMS Alerts to subscribers', type: 'link', class: 'list-item child-item' }
            ]
         }
      ]
   }
]

@Injectable()
export class MenuItems {
   getAll() {
      return MENUITEMS;
   }
}