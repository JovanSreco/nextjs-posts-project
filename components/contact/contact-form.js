import React, { useState, useContext } from "react";
import NotificationContext from "../../context/notification-context";
import classes from "./contact-form.module.css";
import useHttp from "../../hooks/use-http";
import useFormInput from "../../hooks/use-form-input";
import {
  nameValidate,
  emailValidate,
  messageValidate,
} from "../../helpers/validation";

function ContactForm() {
  const {
    value: emailValue,
    hasError: emailHasError,
    onChangeHandler: onEmailChangeHandler,
    onBlurHandler: onEmailBlurHandler,
    reset: emailReset,
  } = useFormInput((value) => emailValidate(value));
  const {
    value: nameValue,
    hasError: nameHasError,
    onChangeHandler: onNameChangeHandler,
    onBlurHandler: onNameBlurHandler,
    reset: nameReset,
  } = useFormInput((value) => nameValidate(value));
  const {
    value: messageValue,
    hasError: messageHasError,
    onChangeHandler: onMessageChangeHandler,
    onBlurHandler: onMessageBlurHandler,
    reset: messageReset,
  } = useFormInput((value) => messageValidate(value));

  const notificationCtx = useContext(NotificationContext);
  const { sendContactData } = useHttp();

  async function sendMessageHandler(event) {
    event.preventDefault();

    notificationCtx.showNotification({
      status: "pending",
      title: "Sending message...",
      message: "Your message is on it's way",
    });

    try {
      await sendContactData({
        email: enteredEmail,
        name: enteredName,
        message: enteredMessage,
      });
      notificationCtx.showNotification({
        status: "success",
        title: "Success!",
        message: "Message is sent successfully",
      });
      nameReset();
      emailReset();
      messageReset();
    } catch (error) {
      notificationCtx.showNotification({
        status: "error",
        title: "Error!",
        message: error.message || "Something went wrong!",
      });
    }
  }

  return (
    <section onSubmit={sendMessageHandler} className={classes.contact}>
      <h1>How can i help you?</h1>
      <form className={classes.form}>
        <div className={classes.controls}>
          <div
            className={`${classes.control} ${
              emailHasError ? classes.invalid : ""
            }`}
          >
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              value={emailValue}
              onChange={onEmailChangeHandler}
              onBlur={onEmailBlurHandler}
            />
            {emailHasError && (
              <p className={classes.error}>
                Enter Correct email! <br></br>Example: test.test@gmail.com
              </p>
            )}
          </div>
          <div
            className={`${classes.control} ${
              nameHasError ? classes.invalid : ""
            }`}
          >
            <label htmlFor="name">Your Name</label>
            <input
              type="name"
              id="name"
              value={nameValue}
              onChange={onNameChangeHandler}
              onBlur={onNameBlurHandler}
            />
            {nameHasError && (
              <p className={classes.error}>
                Name must contain at least 3 alphanumeric characters
              </p>
            )}
          </div>
        </div>
        <div
          className={`${classes.control} ${
            messageHasError ? classes.invalid : ""
          }`}
        >
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            rows="5"
            value={messageValue}
            onChange={onMessageChangeHandler}
            onBlur={onMessageBlurHandler}
          ></textarea>
          {messageHasError && (
            <p className={classes.error}>
              Message must contain at least 1 alphanumeric character
            </p>
          )}
        </div>
        <div className={classes.actions}>
          <button type="submit">Send Message</button>
        </div>
      </form>
    </section>
  );
}

export default ContactForm;
