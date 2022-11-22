import React from "react";
import { Flex, Text, Icon } from "@chakra-ui/react";
import { IoTrash } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import CustomModal from "./CustomModal";
import { Link } from "react-router-dom";

function UserCard({ name, id, onDelete }) {
  const [modalIsVisible, setModalIsVisible] = React.useState(false);

  return (
    <>
      <Flex h="fit-content" p={3} justifyContent="space-between">
        <Text color="gray.400">{name}</Text>

        <Flex>
          <Link to={`app/edit/${id}`}>
            <Icon
              as={MdEdit}
              color="gray.400"
              fontSize={20}
              mr={5}
              _hover={{ color: "green.400", cursor: "pointer" }}
            />
          </Link>
          <Icon
            onClick={() => setModalIsVisible(true)}
            as={IoTrash}
            color="gray.400"
            fontSize={20}
            _hover={{ color: "red.400", cursor: "pointer" }}
          />
        </Flex>
      </Flex>

      <CustomModal
        isOpen={modalIsVisible}
        cancelBtn={true}
        onCancel={() => setModalIsVisible(false)}
        title="Notification"
        msg="Are you sure you want to delete this user?"
        onClose={() => {
          onDelete(id); // deletes user
          setModalIsVisible(false); // closes modal
        }}
      />
    </>
  );
}

export default UserCard;
