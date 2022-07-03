[![Netlify Status](https://api.netlify.com/api/v1/badges/cad37b19-5535-4ea4-98c9-e955be0fdab1/deploy-status)](https://app.netlify.com/sites/fl-pastoral-care/deploys)

This project was built using [GRANDstack](https://grandstack.io) (GraphQL, React, Apollo, Neo4j Database) application.
<br/><br/>
[![First Love Logo](/img/flc-logo-small.png)](https://www.firstlovecenter.com)

# Pastoral Care Application

Please find attached the rough UI Design by clicking this link.
https://xd.adobe.com/view/f5d8900f-8d05-47b4-946e-4d7f315ae6a2-a08b/

## Definition of Key Terms

- **Bacenta Leader**: A leader in charge of a smaller weekly fellowship. This person will also be accountable for tracking the attendance of the members who are assigned to him.
- **CO/Constituency Overseer**: A CO has a number of Bacenta Leaders that he oversees in a designated location which is known as a constituency. He will need to be able to monitor the work of Bacenta Leaders under him.
- **Bishop**: A Bishop Oversees a number of constituencies. Because of this he will also need to be able to monitor the work of constituency overseers as well as Bacenta Leaders under him.
- **Resident Bishop**: Our senior pastor in charge of the church. He oversees all bishops, constituency overseers and Bacenta Leaders in the church.
- **Sheep Seeking Admin**: This is a type of administrator who is responsible for the registration of members. They should also maintain the ability to delete members.
- **Super Admin**: This admin has the ability to create accounts for the different types of leaders (bishops, COs, Bacenta Leaders, Sheep Seeking Admin), as well as updating when there are changes.

## Pastoral Responsibilities

Our church pastoral care runs on four basic activities that a pastor is supposed to do for his assigned members. This is in the form of an acronym PVCI
Prayer, Visitation, Counselling, Interaction

## Pastoral Cycles

Each leader is supposed to routinely perform his duties of PVCI during what we call a pastoral cycle.
For a Bacenta leader his pastoral cycle resets **every month**. This means that he is supposed to pray for, visit, counsel and interact (through phone calls) for each of his members every month.
The pastoral cycle for a Bacenta leader is **one month**.
The pastoral cycle for a constituency overseer is **3 months**. The pastoral cycle for a bishop is **6 months**.

## What We Expect to Achieve Using the Application

1. Sheep seeking admins should be able to register members and assign them to bacentas which will connect them to leaders.
2. Bacenta Leaders should receive a notification at the end of each week alerting them about their newly assigned members which should then go into a special list called “First Timers and New Converts”. Each bacenta leader should have ticked this by the end of the week.
3. Every Bacenta leader should be able to tick attendances for each member assigned to them both on Sunday and during the weekday fellowship meeting.
4. Each member should be classified based on their attendance record. If a member is regular in church, they should be classified as sheep. If they miss four consecutive weeks, they should be classified as goats, missing 8 consecutive weeks will change their classification to deer.
5. All pastoral duties will apply only for sheep and goats. Deer will be left out of everything.
6. There should be a large timer showing the countdown for each individuals pastoral cycle.
7. The leaders (bishops, COs, Bacenta Leaders) should be able to tick for each of their pastoral care duties as well as add a comment (256 max character limit) for each interaction with a member. This history should only be viewed by the bishop.
8. At the end of each pastoral cycle, emails should be sent to all supervisors (bishops, constituency overseers) showing a summary of the work of the leaders under them.
9. Super Admin should be able to create accounts and delete them for each type of user. If possible account creation should be automatically done.
