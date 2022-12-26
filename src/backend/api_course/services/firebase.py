import pyrebase


def noquote(s):
    return s


def database_init():
    config = {
        "apiKey": "AIzaSyClOw090QS2lyZxjr_NSoyiO33i3QFvssk",
        "authDomain": "pbl6elearning.firebaseapp.com",
        "databaseURL": "https://pbl6elearning-default-rtdb.asia-southeast1.firebasedatabase.app",
        "projectId": "pbl6elearning",
        "storageBucket": "pbl6elearning.appspot.com",
        "messagingSenderId": "867590390832",
        "appId": "1:867590390832:web:f22800fff6b99cc62159f5",
        "measurementId": "G-ZJTYS5YYZV"
    }
    firebase = pyrebase.initialize_app(config)
    database = firebase.database()
    pyrebase.pyrebase.quote = noquote
    return database


class SaveNotification():
    @staticmethod
    def save_notification(user_id, data):
        database = database_init()
        noti = database.child("notifications").order_by_child("user_id").equal_to(user_id).get()
        notification_id = list(noti.val())[0]
        number_noti = dict(noti.val()).get(notification_id).get('noti_number') if dict(noti.val()).get(notification_id).get('noti_number') is not None else 0
        database.child("notifications").child(notification_id).child('notification').push(data)
        data_noti_number = {'noti_number': number_noti + 1}
        database.child("notifications").child(notification_id).update(data_noti_number)

    @staticmethod
    def read_notification(page, user_id):
        database = database_init()
        noti = database.child("notifications").order_by_child("user_id").equal_to(user_id).get()
        notification_id = list(noti.val())[0]
        number_noti = dict(noti.val()).get(notification_id).get('noti_number') if dict(noti.val()).get(notification_id).get('noti_number') is not None else 0
        number_noti = number_noti - page if number_noti - page >= 0 else 0
        data_noti_number = {'noti_number': number_noti}
        database.child("notifications").child(notification_id).update(data_noti_number)
