/**
 * ở đây trong DB có mấy thành phần:
 * TODO:
 */
/* 1 accounts: {
      email,
      username,
      password,
      notificationID,
      createdDay,
      state: "block" || "active",
      isConfirm: bool
      webNotificationNews: Notification[]
      telegramNotificationNews: Notification[],
      personId: ref qua person
    };
  Ps: email để recover pass, để biêt notifi
 */
// Notification: {createdDate, openedDate?, title, content, typeNoti, emailAccReceived, telegramId? }
// NotificationPool: Notification[]
/*
    //3 Person: {personId, fullName, phone, birthDay, address ,key ,address? ,description?: string; }
    //4 staff: <- Person.  Extend: { certificate, rate, skills: serviceType[] }
    //5 customer <- Person. Extend: { favorite: serviceType[]  }
    //6 admin <- Person.  Extend: { dynamicRouters;}
    //7 superAdmin <- Person Extend: { dynamicRouters;}
  Ps: kịch bản AI là, gợi ý service cho customer, dựa vào lịch sử bookingTickets.
  // những lớp yoga, được nhiều người booking
*/

//8 superAdmin => admin => {staff, customer}: tất cả dều có 1 account, account có powerRole: {superAdmin, Admin, Staff, Customer}

//9 Routers: routerRole, routerName, childrenRouters: Routers[], isActive . Api: getAll routers => views SuperAdmin.
//serviceType: ['yoga', 'strength',...] : cố định,  hiểu ngầm không cần lưu.

/* 10
services: {
    duration,
    name,
    staffs: [],
    canBookBefore?:
    default 7 ngày,
    serviceType: string,
    state: "active, pending, planing"
    serviceTypes: ['yoga', 'strength',...]
}
ps: => rất nhiều service
serviceTypes:{ name, key ,description?}

*/

//11 bookingTickets: { serviceId, createdDate, bookingTicketsStateId, cusName?, emailCus, phoneCus, staffId? } // lưu trữ ticket theo ngày tạo?, theo trạng thái.  => rất nhiều records?
//12 bookingTicketsState: { name = "chờ xác nhận, đã xác nhận, đã hoàn thành, hủy"; }
// các bước làm:
// hoàn thieenjt rang trainers
// Hoàn thieenjt rang booking goi API luu xuong servier.
// hoàn thiện thông báo booking qua email
// hoàn thiện cơ chế thông báo qua: email, cái chuông trên web.
// đăng kí đăng tài khoản.

// giao diện của PT: không nhất thiết phải làm, vì đây là pt cơ hữu của mình.

// vào trainers: gọi api get all 100PT, group theo type.
//
