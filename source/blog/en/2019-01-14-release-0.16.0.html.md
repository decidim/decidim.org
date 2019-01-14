---
title: New version 0.16.0
published: 'false'
date: 2019-01-14T09:02:16.204Z
---
## New Features

### **Amendments**

With the Amendments feature any participant can edit the text of a proposal and a “sub-proposal” will be created as an [amendment](https://en.wikipedia.org/wiki/Amendment). This amendment may gather endorsements and supports. The author of the original proposal may accept or reject the amendment. If it’s rejected, the author of the amendment may convert it into a new proposal.

* Add filter by type functionality to Amendments on proposals.[ #4567](https://github.com/decidim/decidim/pull/4567/)

* Add version control functionality to Amendments on proposals.[ #4567](https://github.com/decidim/decidim/pull/4567/)

* Add polymorphic Amendment feature that can be activated in the proposal component with these working functionalities: create/withdraw/accept amendments.[ #3985](https://github.com/decidim/decidim/pull/3985/)

* Add reject/promote amendments functionalities into Amendment feature.[ #3986](https://github.com/decidim/decidim/pull/3986/)

![](https://lh5.googleusercontent.com/-vzIp_xv_mlKivgOt-tnSJuc0VIJ-nFkRbGXJQ13jyc0YirUuaF3ciwT4KzCpCxQhv8d5OG0uTiDy86XfWPvEyVAPLPIGkW1gYx3HFweIPtNGt4tG_pzfD8GxCIjTgbMxxZ2keNR)

### **Contextual Help System**

Decidim includes now a configurable contextual help system to guide participants in the use and understanding of the platform.

On one side, the "More information" section is now called "Help" and there you can create different pages grouped by topics. There are some texts poulated by default and they can be modified and customized from the admin interface.

On the other side, in the header of each participation space a collapsible banner is shown with a brief explanation of it.

When a participant registers for the first time she receives a welcome notification with links to the help pages.

* Ability to send a welcome notification to new users[ #4432](https://github.com/decidim/decidim/pull/4432)

* Ability to specify contextual help to participatory spaces[ #4470](https://github.com/decidim/decidim/pull/4470)

* Default pages and contextual help when creating organizations[ #4541](https://github.com/decidim/decidim/pull/4541)

![](https://lh4.googleusercontent.com/7737VtLIlAFLa7TKiIB3Js4opjI2MbkFoz203vF_TUhkaQs2MIzSAtcRxW8sXzHnFzfgdgHaQzdaS7mulbOMxYBWNoBuehq83G5UPkgLE-Zy0qFSTyUQzt92QQXcoz5FzDguIk2K)![](https://lh3.googleusercontent.com/RqzO7RE8QI9WpcjSKL_DTNqJwBN6UPkPh_CPXHG-U7kSjr2RJpkgfcmIKn98S2jNUHm5JuoJIPLtbiPZw4pwtWFHrvT2qHqhAzebLsBRDumuUDF1Yi25ifbU4DPImZ7ySYN4Gcbf)

### **User centered website experience **

To enhance the participant's experience on the platform, she has now options to choose the topics that interest her and be informed about them. There is also a new tab “Activity” where she can monitor her own activity within the platform..

* User activity tab on the public profile.[ #4570](https://github.com/decidim/decidim/pull/4570)

* User timeline tab on the public profile.[ #4574](https://github.com/decidim/decidim/pull/4574)

* Let users select their interests (scopes). They will see relevant activity in the Timeline tab in their profile[ #4621](https://github.com/decidim/decidim/pull/4621)

* Let users choose what kind of notifications they want to receive[ #4663](https://github.com/decidim/decidim/pull/4663)

![](https://lh5.googleusercontent.com/e_tYgK4-jV92vVCjp598w1DWwu0Qe4e2u7PrODNj_18jRbR7wF_YTuNgzd5eVcIZrPsSuI3qpnkVPpgwrsIfOgBkIUmP3UPO3KtRTtf74CBiTJe4a8Q_ztHWxNiCZsUXAttKR1Dz)![](https://lh3.googleusercontent.com/1uVM-GzNPrwE-Jf2SVun2IAzBUFgHQ2u0E-gkEOEf9z7FJHyfSAHIzTJyefIeoTVFUbXUlsIdZ0gvr8EYnAJUS7P6Mn7Ayv7xEQZAjBQklvcAnWCHQ7BoRT0GXDRkz0iEh2Q8c0R)![](https://lh4.googleusercontent.com/aTJ54whr42i7zAsqtZXhjbxxPU2-BSIlfmMPAjhqCLhQRU3S5U2yeFMxQHLXZBptSsQH2Z2bHZTUUrqXUvJrmGoyCPd-hKFMdOatY41kKPldcaKs7xa9wsZUAOrhCNpjf0V-D4N_)

### **Extra hashtags**

For some participatory processes we might want to allow participants to a) assign proposals to several categories, or b) search proposals by category from different participatory processes at once.

This feature defines an additional use of hashtags: extra hashtags. These are regular hashtags added to a content, but with an special character to mark them as "extra" for that particular uses. 

There are automatic and suggested hashtags. Automatic hashtags are hashtags that are assigned by default to all proposals created in a proposals component.

Suggested hashtags allow to define a set of predefined hashtags that can be offered to participants to improve organization of the proposals, also to improve global search results.

* Automatic and suggested hashtags.[ #4585](https://github.com/decidim/decidim/pull/4585/)

![](https://lh6.googleusercontent.com/dSTgSRCqmEu1ZdoCdbanyNgFqBVCqh_4NRAs3b7by9pZkh3BPcD5-SDsZfJulfuyVO1dOfeXBzppjUbpHAPLeWtDlF22cnfJSxy3FYUOYV41ZoJFRYSFn4_cNPRZ9EmcfDO1GIm5)![](https://lh4.googleusercontent.com/sV7PPiT2tg0vFLU-UwJ-q-vd6vFS4b081mGZu3jYivhUlzymsGMynm4h33VAf8l4C2JVcCYtBw7b3mNlgq7c5O5MjHtCz4nVnMS2YzK1k4L1_kHsZZMiIPOKGZv1g6rOr4UpZSwK)

### **Verifications**

* Verification by SMS [#4429](https://github.com/decidim/decidim/pull/4429)

* Online and offline verification by ID document[ #4573](https://github.com/decidim/decidim/pull/4573)


* Online: the user uploads a picture of their document and fills the document type and number. The admin receives the submission, sees the picture and fills the document type and number. If both submissions match, the user is verified.

* Offline: The user doesn't upload any picture, only fills the document type and number. Then visits the admin. The admin needs to fill the user email, document type and number. If all data match, the user is verified.


* User groups verification by uploading a CSV file[ #4613](https://github.com/decidim/decidim/pull/4613)

## Improvements to existing features

### **Assemblies**

* Filter assemblies by type[ #4659](https://github.com/decidim/decidim/pull/4659/)

### **Conferences**

* Diplomas functionallity in an automated way for those users that has their registration confirmed.[ #4443](https://github.com/decidim/decidim/pull/4443)

* Conference registration types.[ #4408](https://github.com/decidim/decidim/pull/4408)

### **Meetings**

* Add user groups and meetings options on Origin filters[ #4462](https://github.com/decidim/decidim/pull/4462)

* Add notification to conferences and meetings registrations[ #4636](https://github.com/decidim/decidim/pull/4636/)

* Add registration form answers when exporting meeting registrations.[#4589](https://github.com/decidim/decidim/pull/4589)

* Allow admins to activate a registration form to be answered by the user when they joins for the meeting[ #4419](https://github.com/decidim/decidim/pull/4419)

* Allow users to sync Decidim meetings with their own calendar apps, using the ICalendar format (.ics)[ #4376](https://github.com/decidim/decidim/pull/4376)

* Etherpad integration[ #4493](https://github.com/decidim/decidim/pull/4493)

### **Proposals**

* Admin can create proposals from the admin panel, with a meeting as an author.[#4382](https://github.com/decidim/decidim/pull/4382)

* Split & merge proposals to the same component[ #4415](https://github.com/decidim/decidim/pull/4415)

* Notify followers of the proposals linked in a result that the result progress has been updated[ #4466](https://github.com/decidim/decidim/pull/4466)

### **Participatory texts**

* Add amend button and amendments counter to participatory text proposals[ #4598](https://github.com/decidim/decidim/pull/4598/)

* Add support to import .odt participatory text files.[ #4386](https://github.com/decidim/decidim/pull/4386)

### **Open Data**

Open Data for meetings, proposals and results.

* Open Data export[ #4578](https://github.com/decidim/decidim/pull/4578)

* Export meetings[ #4597](https://github.com/decidim/decidim/pull/4597)

## Usability improvements

* Show minicard with a little bit of profile data when hovering on user and user group names[ #4472](https://github.com/decidim/decidim/pull/4472)

* Show hashtags with original case[ #4554](https://github.com/decidim/decidim/pull/4554)

* Move Omniauth login buttons to before the signup/sign in forms to improve usability[ #4457](https://github.com/decidim/decidim/pull/4457)

* Improve static pages layout and make them groupable by topic.[ #4338](https://github.com/decidim/decidim/pull/4338)

* Shows the first unread message in a conversation in the notification email[ #4463](https://github.com/decidim/decidim/pull/4463)

* Improve user groups form[ #4458](https://github.com/decidim/decidim/pull/4458)

* Show one highlighted resources block per component in process page[ #4456](https://github.com/decidim/decidim/pull/4456)

* Rename "Officializations" section to "Participants"[ #4510](https://github.com/decidim/decidim/pull/4510)

* Improve search results layout. Now results appear grouped by type[ #4537](https://github.com/decidim/decidim/pull/4537)

"Follows" section in user profiles now show every resource they follow[#4616](https://github.com/decidim/decidim/pull/4616)
