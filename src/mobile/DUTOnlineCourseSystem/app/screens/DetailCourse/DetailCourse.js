import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  TextInput,
  Dialog,
  Button,
  Portal,
  Paragraph,
} from "react-native-paper";
import renderStar from "../../../utils/renderStar";
import tw from "tailwind-react-native-classnames";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import Chapter from "../../components/Chapter";
import { WebView } from "react-native-webview";
import { enRoll } from "../../actions/processAction";
import { connect, useDispatch, useSelector } from "react-redux";
import RenderHtml from "react-native-render-html";
import { getCourse } from "../../actions/courseAction";
import { Modal } from "../../components/Modal";
import { getCourseProcess } from "../../actions/courseProcessAction";
import RatingSection from "./RatingSection";
import { createRating } from "../../actions/coursesAction";
import { PROCESS_STATUS } from "../../const/processStatus";
import { getAvatar } from "../../../utils/getImage";
// import RNPdfToImage from "react-native-pdf-to-image";


const DetailCourse = ({ route, navigation }) => {
  const ratingState = [true, false, false, false, false];
  const dispatch = useDispatch();
  const { course_id } = route.params;
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const handleModal = () => setIsModalVisible(() => !isModalVisible);
  const [rating, setRating] = React.useState(ratingState);
  const [currentRating, setCurrentRating] = React.useState(1);
  const [ratingTitle, setRatingTitle] = React.useState("");
  const [ratingContent, setRatingContent] = React.useState("");
  const [error, setError] = React.useState("");
  const course_data = useSelector((state) => state.course);
  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const [myRating, setMyRating] = useState({
    title: "",
    content: "",
    star_rating: 0,
  });
  console.log(course_data.certificate_frame?.split("pdf?")[0]+'pdf');
  const user = useSelector((state) => state.user);
  const getMyRating = () => {
    if (course_data.status_rating) {
      course_data.ratings.map((e, i) => {
        if (e.user.id == user.id) {
          setMyRating({
            title: e.title,
            content: e.content,
            star_rating: e.star_rating,
          });
          return;
        }
      });
    }
  };

  const handleSubmitRating = () => {
    if (ratingTitle == "") {
      setError("Please input title");
      return;
    }
    if (ratingContent == "") {
      setError("Please input feedback");
      return;
    }
    dispatch(
      createRating({
        title: ratingTitle,
        content: ratingContent,
        star_rating: currentRating,
        course_id: course_data.id,
        course_slug: course_data.slug,
      })
    );
    setIsModalVisible(false);
  };
  const changeRating = (numberStar) => {
    let currentRating = [true, false, false, false, false];
    for (let i = 1; i < 5; i++) {
      if (i <= numberStar) {
        currentRating[i] = true;
      } else {
        currentRating[i] = false;
      }
    }
    setRating(currentRating);
    setCurrentRating(numberStar + 1);
  };

  if (course_data.isLoading) {
    return <View></View>;
  } else {
    return (
      <ScrollView style={{ padding: 25, paddingBottom: 50 }}>
        <View style={{ alignItems: "center", marginTop: 25, marginBottom: 50 }}>
          <Image
            style={styles.image}
            source={{
              uri:
                course_data.background ||
                "https://www.classcentral.com/report/wp-content/uploads/2020/04/most-popular-all-time-1.png",
            }}
          ></Image>
          <View style={{ alignItems: "flex-start" }}>
            <Text style={[styles.title, styles.spaceBetweenComponent]}>
              {course_data.title}
            </Text>
          </View>
          <View style={[styles.contentComponent, styles.spaceBetweenComponent]}>
            <Text style={{ textAlign: "justify" }}>{course_data.summary}</Text>
          </View>
          <View style={{ alignItems: "center", width: "100%" }}>
            <View
              style={[styles.contentComponent, styles.spaceBetweenComponent]}
            >
              <View
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                {renderStar(course_data.avg_rating)}
              </View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  marginTop: 8,
                }}
              >
                <Text
                  style={{
                    color: "#FFBD35",
                    fontWeight: "600",
                    marginRight: 8,
                  }}
                >
                  {course_data.avg_rating.toString().substring(0, 4)}/5
                </Text>
                <Text>{course_data.total_rating} ratings</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  paddingTop: 8,
                }}
              >
                {course_data.process_status == PROCESS_STATUS.NOT_OPEN ||
                course_data.process_status == PROCESS_STATUS.OPEN ? (
                  <></>
                ) : (
                  <>
                    {course_data.status_rating ? (
                      <View>
                        <TouchableOpacity
                          onPress={() => {
                            showDialog();
                            getMyRating();
                          }}
                        >
                          <View style={styles.btnRating}>
                            <Text style={{ color: "white" }}>
                              View your rating
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <View>
                        <TouchableOpacity onPress={handleModal}>
                          <View style={styles.btnRating}>
                            <Text style={{ color: "white" }}>
                              Generate feedback
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    )}
                  </>
                )}
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={[
              styles.spaceBetweenComponent,
              { justifyContent: "center", alignItems: "center" },
            ]}
            onPress={() => {
              dispatch(getCourseProcess({ course_id: course_data.id }));
              navigation.navigate("Lesson", { course_id: course_data.id });
            }}
          >
            <View
              style={[
                styles.btnEnroll,
                { width: "100%", alignSelf: "center", alignItems: "center" },
              ]}
            >
              {course_data.process_status == PROCESS_STATUS.NOT_OPEN ||
              course_data.process_status == PROCESS_STATUS.OPEN ? (
                <Text style={{ color: "white", fontWeight: "700" }}>
                  Enroll now
                </Text>
              ) : course_data.process_status == PROCESS_STATUS.IN_PROGRESS ? (
                <Text style={{ color: "white", fontWeight: "700" }}>
                  Continue
                </Text>
              ) : (
                <Text style={{ color: "white", fontWeight: "700" }}>
                  Review
                </Text>
              )}
            </View>
          </TouchableOpacity>
          <View
            style={
              ({ alignItems: "center", width: "100%" },
              [styles.contentComponent, styles.spaceBetweenComponent])
            }
          >
            <RenderHtml source={{ html: `${course_data.description}` }} />
          </View>
          <View
            style={
              ({ alignItems: "center", width: "100%" },
              [styles.contentComponent, styles.spaceBetweenComponent])
            }
          >
            <View>
              <View style={{ flexDirection: "row", minHeight: 60 }}>
                <View style={{ width: "30%", alignItems: "center" }}>
                  <Image
                    style={styles.avatar}
                    source={{
                      uri: course_data.user.avatar || getAvatar(),
                    }}
                  ></Image>
                </View>
                <View style={{ width: "70%", justifyContent: "center" }}>
                  <Text
                    style={{
                      color: "#024547",
                      fontWeight: "700",
                    }}
                  >
                    {course_data.user.full_name}
                  </Text>
                  <Text
                    style={{
                      color: "#024547",
                      fontWeight: "500",
                    }}
                  >
                    {course_data.user.role}
                  </Text>
                </View>
              </View>
              <Text style={{ textAlign: "justify", paddingTop: 10 }}>
                {course_data.user.bio}
              </Text>
            </View>
          </View>
          <View style={{ alignItems: "flex-start" }}>
            <Text style={[styles.title, styles.spaceBetweenComponent]}>
              {course_data.chapters.length} Chapters in this Specialization
            </Text>
          </View>
          <View style={{ paddingTop: 25, width: "100%" }}>
            {course_data.chapters.map((e, index) => (
              <View
                key={index.toString()}
                style={{ paddingBottom: 20, width: "100%" }}
              >
                <Chapter props={[e, index]} style={{ width: "100%" }} />
              </View>
            ))}
          </View>
          {/* Rating */}
          <View
            style={
              ({ alignItems: "center", width: "100%", marginBottom: 100 },
              [styles.contentComponent])
            }
          >
            <RatingSection></RatingSection>
          </View>
          {/* Modal */}
          <View>
            <Modal isVisible={isModalVisible}>
              <View
                style={{ flex: 1, justifyContent: "center", maxHeight: 500 }}
              >
                <View style={[styles.contentComponent]}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.text}>How did we do?</Text>
                    <TouchableOpacity onPress={handleModal}>
                      <Text style={[styles.text, { paddingRight: 4 }]}>X</Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <Text style={{ opacity: 0.7, paddingBottom: 16 }}>
                      Please let us know how we did with your support request.
                      All feedbach is appreciared to help us improve our
                      offering!
                    </Text>
                  </View>
                  <View
                    style={{
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "space-around",
                      paddingBottom: 16,
                    }}
                  >
                    {!rating[0] ? (
                      <TouchableOpacity onPress={() => changeRating(0)}>
                        <AntDesign
                          size={30}
                          color="#FFBD35"
                          name="staro"
                          width={30}
                          style={{ width: 30 }}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity onPress={() => changeRating(0)}>
                        <AntDesign
                          size={30}
                          color="#FFBD35"
                          name="star"
                          width={30}
                          style={{ width: 30 }}
                        />
                      </TouchableOpacity>
                    )}
                    {!rating[1] ? (
                      <TouchableOpacity onPress={() => changeRating(1)}>
                        <AntDesign
                          size={30}
                          color="#FFBD35"
                          name="staro"
                          width={30}
                          style={{ width: 30 }}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity onPress={() => changeRating(1)}>
                        <AntDesign
                          size={30}
                          color="#FFBD35"
                          name="star"
                          width={30}
                          style={{ width: 30 }}
                        />
                      </TouchableOpacity>
                    )}
                    {!rating[2] ? (
                      <TouchableOpacity onPress={() => changeRating(2)}>
                        <AntDesign
                          size={30}
                          color="#FFBD35"
                          name="staro"
                          width={30}
                          style={{ width: 30 }}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity onPress={() => changeRating(2)}>
                        <AntDesign
                          size={30}
                          color="#FFBD35"
                          name="star"
                          width={30}
                          style={{ width: 30 }}
                        />
                      </TouchableOpacity>
                    )}
                    {!rating[3] ? (
                      <TouchableOpacity onPress={() => changeRating(3)}>
                        <AntDesign
                          size={30}
                          color="#FFBD35"
                          name="staro"
                          width={30}
                          style={{ width: 30 }}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity onPress={() => changeRating(3)}>
                        <AntDesign
                          size={30}
                          color="#FFBD35"
                          name="star"
                          width={30}
                          style={{ width: 30 }}
                        />
                      </TouchableOpacity>
                    )}
                    {!rating[4] ? (
                      <TouchableOpacity onPress={() => changeRating(4)}>
                        <AntDesign
                          size={30}
                          color="#FFBD35"
                          name="staro"
                          width={30}
                          style={{ width: 30 }}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity onPress={() => changeRating(4)}>
                        <AntDesign
                          size={30}
                          color="#FFBD35"
                          name="star"
                          width={30}
                          style={{ width: 30 }}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                  <View style={{ paddingBottom: 16 }}>
                    <TextInput
                      mode="outlined"
                      label="Title"
                      value={ratingTitle}
                      onChangeText={(text) => setRatingTitle(text)}
                      selectionColor="#024547"
                      underlineColor="#024547"
                      activeOutlineColor="#024547"
                      style={{ fontSize: 18 }}
                    />
                    <TextInput
                      multiline
                      numberOfLines={3}
                      mode="outlined"
                      label="Your feedback"
                      value={ratingContent}
                      onChangeText={(text) => setRatingContent(text)}
                      selectionColor="#024547"
                      underlineColor="#024547"
                      activeOutlineColor="#024547"
                      style={{ fontSize: 18 }}
                    />
                  </View>
                  <View style={[styles.buttonCover, { width: "100%" }]}>
                    <TouchableOpacity
                      style={[styles.button, { width: "100%" }]}
                      onPress={handleSubmitRating}
                    >
                      <Text style={{ color: "white", fontWeight: "700" }}>
                        Rating
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
          {/* Dialog */}
          <View>
            <Portal>
              <Dialog
                visible={visible}
                onDismiss={hideDialog}
                style={{ backgroundColor: "white" }}
              >
                <Dialog.Title style={{ fontSize: 24 }}>
                  {myRating.title}
                </Dialog.Title>
                <Dialog.Content>
                  <View
                    style={{ flexDirection: "row", justifyContent: "center" }}
                  >
                    {renderStar(myRating.star_rating)}
                  </View>
                  <Paragraph>{myRating.content}</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button
                    onPress={hideDialog}
                    textColor="#024547"
                    fontWeight="bold"
                  >
                    Done
                  </Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          </View>
        </View>
      </ScrollView>
    );
  }
};
export default DetailCourse;
const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 158,
    borderRadius: 5,
    top: -2,
    left: -2,
  },
  spaceBetweenComponent: {
    marginTop: 25,
    width: "100%",
  },
  title: {
    fontWeight: "700",
    alignItems: "center",
    color: "#024547",
  },
  contentComponent: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 5,
    // alignItems:''
    textAlign: "justify",
    width: "100%",
  },
  btnEnroll: {
    backgroundColor: "#024547",
    padding: 16,
    width: "100%",
    borderRadius: 5,
    alignItems: "center",
  },
  avatar: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  textJustifyPadding: {
    marginBottom: 16,
    textAlign: "justify",
  },
  btnRating: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#024547",
    color: "White",
    fontWeight: "500",
  },
  buttonCover: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modal: {
    height: "80%",
    alignItems: "center",
    backgroundColor: "#00ff00",
    padding: 100,
    bottom: 0,
  },
  text: {
    marginBottom: 12,
    color: "#024547",
    fontWeight: "700",
    fontSize: 18,
  },
  button: {
    backgroundColor: "#024547",
    borderRadius: 8,
    width: "35%",
    color: "white",
    fontWeight: "600",
    height: 40,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
});
