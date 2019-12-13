---
title: Comparison of Decidim and Consul
date: 2019-01-14
---

![consulproject.org](/uploads/consul_comparison.png)

**Translation note**: this document is a translation to English of a **[blog post by Xabier E. Barandiaran](https://xabier.barandiaran.net/2019/01/14/comparativa-decidim-vs-consul/)** (with permission). Since this document might evolve independently, we have substituted first person singular forms by first person plural.

Many people have asked what are the differences between **[Decidim](https://decidim.org/)** and **[Consul](http://consulproject.org/)**, the two democratic participation platforms developed in Barcelona and Madrid, respectively. The projects are fairly similar and people often wonder how they differ and which adapts best to their needs.

In this document, we include **[a comparison table of the differences and functions of Consul and Decidim](https://docs.google.com/spreadsheets/d/1M2B9jXEkx_qXoAnxokUjSvKHQMc2gUQ-pPMKdcSYs1I/edit?usp=sharing)**. We also explain the main differences between the two projects, in terms of their concept, community and philosophy. This document is inevitably biased and incomplete because the author acknowledges that he doesn’t know Consul as well as he knows Decidim (of which he was the founder and coordinator for three years). An effort, however, was made to be fair in the comparison. 

Roxu, Pablo, Andrés and Alberto contributed with feedback and a special mention is due to **[aLabs](https://docs.google.com/spreadsheets/d/1s4bFiHpT7Oe8ZTfDqhmxG6VGWjf5IEP2t5qWHggbO9s/edit?usp=sharing)** for allowing access to a fresh installation of Consul from where we could carry out a functionality tests.

### Comparison Tables of Functions and Features

We shall begin with the comparison table. It’s not easy to create because the two platforms have relatively different concepts with regard to the organisation of their functions. We will try to be as abstract and neutral as possible. The features are those that are available today (14 January 2019), downloading, installing and displaying the code of the latest version of each platform that can be found in the repository of each project. This is the result:

<table>
  <thead>
    <tr>
      <th>Type of Function</th>
      <th>Feature</th>
      <th>Decidim</th>
      <th>Consul</th>
    </tr>
  </thead>
  <tbody>
    <tr>
        <td>Participatory Spaces or Modes</td>
        <td>Configurable participatory processes</td>
        <td>yes</td>
        <td>no</td>
    </tr>
    <tr>
        <td></td>
        <td>Direct initiatives or proposals</td>
        <td>yes</td>
        <td>yes</td>
    </tr>
    <tr>
        <td></td>
        <td>Collaborative legislation</td>
        <td>yes, as a process</td>
        <td>yes</td>
    </tr>
    <tr>
        <td></td>
        <td>Participatory budgets</td>
        <td>yes, as a process</td>
        <td>yes</td>
    </tr>
    <tr>
        <td></td>
        <td>Participatory organisations</td>
        <td>yes</td>
        <td>no</td>
    </tr>
    <tr>
        <td></td>
        <td>Digital consultations</td>
        <td>yes</td>
        <td>yes</td>
    </tr>
    <tr>
        <td></td>
        <td>Off-line voting</td>
        <td>no</td>
        <td>yes</td>
    </tr>
    <tr>
        <td></td>
        <td>Conferences</td>
        <td>yes</td>
        <td>no</td>
    </tr>
    <tr>
        <td>Participatory Components or Mechanisms</td>
        <td>Proposals</td>
        <td>yes</td>
        <td>yes</td>
    </tr>
    <tr>
        <td></td>
        <td>Discussions and debates</td>
        <td>yes</td>
        <td>yes</td>
    </tr>
    <tr>
        <td></td>
        <td>Meetings</td>
        <td>yes</td>
        <td>no</td>
    </tr>
    <tr>
        <td></td>
        <td>Results monitoring</td>
        <td>yes</td>
        <td>yes, only for budgets</td>
    </tr>
    <tr>
        <td></td>
        <td>Comments</td>
        <td>yes</td>
        <td>yes</td>
    </tr>
    <tr>
        <td></td>
        <td>Blogs</td>
        <td>yes</td>
        <td>no</td>
    </tr>
    <tr>
        <td></td>
        <td>Surveys</td>
        <td>yes</td>
        <td>yes</td>
    </tr>
    <tr>
        <td></td>
        <td>Sortitions</td>
        <td>yes</td>
        <td>no</td>
    </tr>
    <tr>
        <td></td>
        <td>Comments on texts</td>
        <td>yes</td>
        <td>yes</td>
    </tr>
    <tr>
        <td></td>
        <td>Newsletter</td>
        <td>yes</td>
        <td>yes</td>
    </tr>
    <tr>
        <td></td>
        <td>Search engine</td>
        <td>yes</td>
        <td>yes</td>
    </tr>
  </tbody>
</table>

<p style="text-align: center;">
  <b>Table 1</b>: Comparison between Decidim and Consul of the functions for participatory spaces and components or mechanisms
</p>

For spaces and components, Decidim is the winner, as it has a more modular and configurable approach, which has forced abstractions to be made and has allowed elements to be recombinable. Some of these elements or components are not available on Consul. Perhaps the most important one is that of meetings or in-person events.

<table>
  <thead>
    <tr>
      <th>Type of Function</th>
      <th>Feature</th>
      <th>Decidim</th>
      <th>Consul</th>
    </tr>
  </thead>
  <tbody>
    <tr>
        <td>Features related to Proposals</td>
        <td>Rich text</td>
        <td>no, to prevent spam</td>
        <td>yes</td>
    </tr>
    <tr>
        <td></td>
        <td>Geolocation</td>
        <td>yes</td>
        <td>yes</td>
    </tr>
    <tr>
        <td></td>
        <td>Attach video</td>
        <td>yes, for initiatives</td>
        <td>yes</td>
    </tr>
    <tr>
        <td></td>
        <td>Attach image</td>
        <td>yes</td>
        <td>yes</td>
    </tr>
    <tr>
        <td></td>
        <td>Attach other documents</td>
        <td>yes</td>
        <td>yes</td>
    </tr>
    <tr>
        <td></td>
        <td>Follow proposal and receive notifications</td>
        <td>yes</td>
        <td>yes</td>
    </tr>
    <tr>
        <td></td>
        <td>Identification of related proposals</td>
        <td>yes, during creation wizard</td>
        <td>yes, public ones</td>
    </tr>
    <tr>
        <td></td>
        <td>Automatic notifications</td>
        <td>yes</td>
        <td>yes</td>
    </tr>
    <tr>
        <td></td>
        <td>Manual notifications</td>
        <td>no</td>
        <td>yes</td>
    </tr>
    <tr>
        <td></td>
        <td>Official response to proposals</td>
        <td>yes</td>
        <td>yes</td>
    </tr>
    <tr>
        <td></td>
        <td>Amendments to proposals</td>
        <td>yes</td>
        <td>no</td>
    </tr>
    <tr>
        <td></td>
        <td>Proposal filter by category</td>
        <td>yes</td>
        <td>yes</td>
    </tr>
    <tr>
        <td></td>
        <td>Category trends</td>
        <td>no</td>
        <td>yes</td>
    </tr>
    <tr>
        <td></td>
        <td>Verification of the integrity of proposals</td>
        <td>yes</td>
        <td>no</td>
    </tr>
    <tr>
        <td></td>
        <td>Different forms of viewing/browsing</td>
        <td>no</td>
        <td>yes</td>
    </tr>
    <tr>
        <td></td>
        <td>Collaborative drafts for proposals</td>
        <td>yes</td>
        <td>no</td>
    </tr>
    <tr>
        <td></td>
        <td>Proposal community</td>
        <td>no</td>
        <td>yes</td>
    </tr>
  </tbody>
</table>

<p style="text-align: center;">
  <b>Table 2</b>: Comparison between Decidim and Consul of the functions for proposals
</p>

Proposals, together with meetings and in-person events, are an essential part of democratic participation. Both Consul and Decidim have a sophisticated creation, discussion and development system for proposals. **Table 2** summarises some of the functions associated with proposals. It is important to note that for Decidim we have distinct between two types of features categorised here: those belonging to the "proposal" component, which can be activated at different stages of processes or in participatory organs or assemblies and that of the “initiatives” space (which is equivalent to Consul’s proposals). On Decidim, participatory Initiatives (made by citizens, partners, or any member of the organization) is a space rich in features, beyond the proposal included. Participants can activate in-person meetings or add static pages and documents. However, all this potential is not active when a simple proposal is made as part of a participation process.

<table>
  <thead>
    <tr>
      <th>Type of Function</th>
      <th>Feature</th>
      <th>Decidim</th>
      <th>Consul</th>
    </tr>
  </thead>
  <tbody>
    <tr>
        <td>Features related to Meetings</td>
        <td>Meeting page</td>
        <td>yes</td>
        <td>no</td>
    </tr>
    <tr>
        <td></td>
        <td>Registration and access code generation</td>
        <td>yes</td>
        <td>no</td>
    </tr>
    <tr>
        <td></td>
        <td>Meeting minutes page</td>
        <td>yes</td>
        <td>no</td>
    </tr>
    <tr>
        <td></td>
        <td>Announcement of special services for the meeting</td>
        <td>yes</td>
        <td>no</td>
    </tr>
    <tr>
        <td></td>
        <td>Meetings map</td>
        <td>yes</td>
        <td>no</td>
    </tr>
    <tr>
        <td>Features related to Participants</td>
        <td>Internal direct messages between users</td>
        <td>yes</td>
        <td>yes</td>
    </tr>
    <tr>
        <td></td>
        <td>Officialized users (with badge)</td>
        <td>yes</td>
        <td>yes</td>
    </tr>
    <tr>
        <td></td>
        <td>User verification with citizen census</td>
        <td>yes</td>
        <td>yes</td>
    </tr>
    <tr>
        <td></td>
        <td>User verification with SMS</td>
        <td>yes</td>
        <td>yes</td>
    </tr>
    <tr>
        <td></td>
        <td>Gamification</td>
        <td>yes</td>
        <td>no</td>
    </tr>
    <tr>
        <td></td>
        <td>Activity stream for participants</td>
        <td>yes</td>
        <td>yes</td>
    </tr>
    <tr>
        <td></td>
        <td>Mentions for participants</td>
        <td>yes</td>
        <td>yes</td>
    </tr>
    <tr>
        <td></td>
        <td>Meets privacy standards and GDPR</td>
        <td>yes</td>
        <td>yes</td>
    </tr>
    <tr>
        <td>Other Features</td>
        <td>Differentiated administration roles</td>
        <td>yes</td>
        <td>yes</td>
    </tr>
    <tr>
        <td></td>
        <td>Integration with Citizens Advice Bureau (OAC)</td>
        <td>poor</td>
        <td>yes</td>
    </tr>
    <tr>
        <td></td>
        <td>Version control for proposals and results</td>
        <td>yes</td>
        <td>no</td>
    </tr>
    <tr>
        <td></td>
        <td>Electronic voting gateway</td>
        <td>yes</td>
        <td>yes</td>
    </tr>
    <tr>
        <td></td>
        <td>Browsing of proposals by (hash)tags</td>
        <td>yes</td>
        <td>yes</td>
    </tr>
    <tr>
        <td></td>
        <td>Notifications for proposal followers</td>
        <td>yes</td>
        <td>yes</td>
    </tr>
    <tr>
        <td></td>
        <td>Blogging or microblogging by users</td>
        <td>no</td>
        <td>no</td>
    </tr>
    <tr>
        <td></td>
        <td>Follow contents and people and receive notifications</td>
        <td>yes</td>
        <td>only for proposals</td>
    </tr>
    <tr>
        <td></td>
        <td>Admin documents</td>
        <td>yes</td>
        <td>yes</td>
    </tr>
    <tr>
        <td></td>
        <td>Integration with social networks</td>
        <td>yes</td>
        <td>yes</td>
    </tr>
  </tbody>
</table>

<p style="text-align: center;">
  <b>Table 3</b>: Comparison between Decidim and Consul of functions related to participants and other generic functions of the platform
</p>

Both platforms treat their participants well, guaranteeing their verification and offering enhanced personal spaces and profiles. The only main difference in this respect is that Decidim includes a gamification system to encourage participation and democratic quality. Decidim also has additional measures to guarantee the privacy of its users (such as personal information hashing) and to monitor and audit the activity of administrators. In terms of other generic features, Consul has a much more mature and developed system of institutional roles, adapted to local administration and government, as well as a much higher score in the compliance with website accessibility standards.

<table>
  <thead>
    <tr>
      <th>Type of Function</th>
      <th>Feature</th>
      <th>Decidim</th>
      <th>Consul</th>
    </tr>
  </thead>
  <tbody>
    <tr>
        <td>Architecture</td>
        <td>Programming language</td>
        <td>Ruby</td>
        <td>Ruby</td>
    </tr>
    <tr>
        <td></td>
        <td>Free and open source software</td>
        <td>yes</td>
        <td>yes</td>
    </tr>
    <tr>
        <td></td>
        <td>Modular (with RoR engines)</td>
        <td>yes</td>
        <td>no</td>
    </tr>
    <tr>
        <td></td>
        <td>Multitenant</td>
        <td>yes</td>
        <td>no</td>
    </tr>
    <tr>
        <td></td>
        <td>Mobile app</td>
        <td>no</td>
        <td>no</td>
    </tr>
    <tr>
        <td></td>
        <td>Defined public roadmap</td>
        <td>yes</td>
        <td>yes</td>
    </tr>
    <tr>
        <td>Community</td>
        <td>Community space</td>
        <td>yes</td>
        <td>yes</td>
    </tr>
    <tr>
        <td></td>
        <td>Community space with own software</td>
        <td>yes</td>
        <td>no</td>
    </tr>
    <tr>
        <td></td>
        <td>Regular community meetings</td>
        <td>yes, annual and monthly</td>
        <td>yes, annual</td>
    </tr>
    <tr>
        <td></td>
        <td>Physical reference space</td>
        <td>yes</td>
        <td>yes</td>
    </tr>
    <tr>
        <td></td>
        <td>Democratic governance of the project</td>
        <td>yes</td>
        <td>no</td>
    </tr>
    <tr>
        <td></td>
        <td>Social contract</td>
        <td>yes</td>
        <td>no</td>
    </tr>
    <tr>
        <td></td>
        <td>Democratic Innovation Laboratory</td>
        <td>yes</td>
        <td>yes</td>
    </tr>
    <tr>
        <td>Scope</td>
        <td>Number of active installations</td>
        <td>46</td>
        <td>55</td>
    </tr>
    <tr>
        <td></td>
        <td>Number of languages available</td>
        <td>18</td>
        <td>28</td>
    </tr>
  </tbody>
</table>

<p style="text-align: center;">
  <b>Table 4</b>: Comparison between Decidim and Consul regarding architecture, community and scope
</p>

Lastly, we can compare other aspects of both projects. The subjects of *community* and *architecture* are discussed below. Regarding the extension and user-base of both platforms scope, we have made the calculations by taking information from the two official websites. However, for both, we have only included those organisations that currently *use *and have an active instance of Consul or Decidim. In the case of languages, we have only included root languages, meaning that we have excluded translations that are variants of the same language (such as simplified Finnish or Spanish spoken in Paraguay).

The complete table in spreadsheet format can be viewed and downloaded **[here in Google Drive](https://docs.google.com/spreadsheets/d/1M2B9jXEkx_qXoAnxokUjSvKHQMc2gUQ-pPMKdcSYs1I/edit?usp=sharing)**.

### Assessment of Qualitative Aspects

In terms of more qualitative aspects, we believe that the main difference between the two projects can be divided into three layers: political, technopolitical and technological.

With regard to the **political** layer, Consul is a project with a greater institutional and international projection. This is not only due to the geographical distribution and international scope of the organisations and administrations that use Consul but also to the recognition and promotion it has obtained (from the national press to the UN). In addition, Madrid City Council has gotten the most out of this tool, making it a worldwide reference for participatory democracy. Decidim and Barcelona City Council haven’t done so bad but the repercussion and scope is clearly smaller, despite having a substantial reach in France and having the Helsinki City Council among one of its prominent international users.

For the **technopolitical** layer, we will focus on two aspects: the *politics of the technology*, which we will call community-technopolitics (how the code and communities are managed) and the *technology of the politics* or functional-technopolitics (software features and how they affect the politics, the democracy, of the organisations that use it). In both cases, there are significant differences. 

**Functional-Technopolitics**: Consul is a tool that mainly focuses on local councils and municipal authorities (although there are universities, regional authorities, etc. that use Consul) and promotes 4 very specific models for participatory democracy: 1. proposals of citizen petitions and initiatives, 2. participatory budgets, 3. Consultations, endorsements and voting, and 4. collaborative legislation (commented texts). If your government or organisation wishes to roll out one of these functions, Consul suits the task perfectly. However, if you need to design your own participatory process or alter the format that Consul has designed for its democratic model, you won’t be able to adapt the platform (without hiring programmers and paying a high technical debt for updates, which is what happened to us in Barcelona). Decidim has a different philosophy. It has been created as a system for designing participatory democracy spaces of any kind: participatory budgets, conferences, participatory organisations by sortitions, candidate election processes, participatory document creations, etc. The logic behind Decidim is that you can create a *participatory space* and combine different *components* to design a customized democracy. Take a look at [this document to understand the democratic architecture of Decidim](https://docs.decidim.org/features/en/general-description/).

**Community-Technopolitics**: For many, the most fundamental difference between the two projects is found at the level of the community and its governance. Consul is a project led and governed by Madrid City Council. Decidim, in contrast, is open to a participatory and democratic design and has just begun a participatory process to define its model of community governance at **[meta.decidim.org](http://meta.decidim.org/)**. In a way, Decidim is a more democratic and participatory project than Consul, for better or worse. A significant point in this respect is that whilst [Consul’s community website ](https://community.consulproject.org/)uses Discourse (a forum designed for questions and answers), **[Decidim’s community website](https://meta.decidim.org/)** uses Decidim itself, thus the name MetaDecidim. Some are of the opinion that this makes Decidim a project that is more coherent with its own principles, as well as one that also helps improve the software and democratic quality it defends, governing itself in a democratic and participatory way. Accordingly, it is worth mentioning the **[social contract](https://decidim.org/contract/)** [that binds the members of the Decidim community](https://decidim.org/contract/), institutions, universities, companies and other organisations that work with Decidim.

For the **technology** layer, at first glance, the two projects look almost identical, with some aesthetic differences: both are free and open source software projects, developed in Ruby on Rails, openly developed on GitHub, translated into various languages and with integrated services like maps, e-mail and user verification systems. The main difference lies in the architecture: Decidim is modular and multitenant, while Consul has a monolithic (non-modular) architecture and does not allow various tenants to be run on the same installation (you cannot install Consult once and run 10 different participatory portals). The modularity of the code and the development bottlenecks that Madrid's architecture creates are explained well in **[this report (in Spanish), prepared by Asociación aLabs](https://alabs.gitbooks.io/propuesta-de-cambios-en-la-arquitectura-de-consul/content/)**.

### Which of the Two Platforms, Decidim or Consul, Is Better?

This is a difficult question to answer because there are so many factors to consider, including your requirements or what you consider to be the best. Consul is better-adapted to a very specific participation model (that of Madrid) and particularly to participatory budgets. Decidim is much more configurable and allows more things to be done than what Consul makes possible. Consul, on the other hand, has more publicity, has been promoted further and is more widespread. From functional, architectural and community viewpoints, we strongly believe that Decidim has many advantages. The origin of the Decidim project lies precisely in the limitations of Consul in regard to these aspects. Decidim is more modular, collaborative, versatile and more democratic and participatory. For this reason, more people prefer Decidim. However, if you are already a Consul user or use it in your organisation and it meets your needs, you are using the right tool. If you're still in doubt, **[try Decidim](https://decidim.org/es/demo/)**, you can also see how it works at a **[community level](https://meta.decidim.org/)** or at a [city level](https://decidim.barcelona/). Consul doesn’t have a sandbox or a demo but you can see what this software is capable of by visiting **[Madrid’s participatory portal](https://decide.madrid.es/)**.
 