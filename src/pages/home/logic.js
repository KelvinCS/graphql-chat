/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { gql } from "apollo-boost";
import { useSubscription, useQuery } from "@apollo/react-hooks";
import { identity, when, concat } from "ramda";

const messageSubscription = gql`
  subscription message {
    message {
      id
      text
    }
  }
`;

const messagesQuery = gql`
  query messages {
    messages {
      id
      text
    }
  }
`;

function useMessages() {
  const [messages, setMessages] = useState([]);
  const updateMessages = (...newMessages) =>
    setMessages(concat(messages, newMessages));

  const { data: queryData = {} } = useQuery(messagesQuery);
  useEffect(() => setMessages(queryData.messages || []), [queryData]);

  const { data: subData = {} } = useSubscription(messageSubscription);
  useEffect(() => when(identity, updateMessages)(subData.message), [subData]);

  return messages;
}

export { useMessages };
