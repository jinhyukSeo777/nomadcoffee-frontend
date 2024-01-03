import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { brownColor } from "../color";

const SEE_COFFEESHOP_MUTATION = gql`
  mutation SeeCoffeeShop($id: Int!) {
    seeCoffeeShop(id: $id) {
      id
      name
      latitude
      longitude
      categories {
        id
        name
      }
    }
  }
`;

const EDIT_COFFEESHOP_MUTATION = gql`
  mutation EditCoffeeShop(
    $shopId: Int!
    $name: String
    $latitude: String
    $longitude: String
    $categories: String
    $photo: Upload
  ) {
    editCoffeeShop(
      shopId: $shopId
      name: $name
      latitude: $latitude
      longitude: $longitude
      categories: $categories
      photo: $photo
    ) {
      ok
      error
    }
  }
`;

const DELETE_COFFEESHOP_MUTATION = gql`
  mutation DeleteCoffeeShop($shopId: Int!) {
    deleteCoffeeShop(shopId: $shopId) {
      ok
      error
    }
  }
`;

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoginBox = styled.div`
  width: 600px;
  height: 730px;
  border-radius: 7px;
  background-color: white;
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 0px;
  }
`;

export const LoginBoxHeader = styled.div`
  width: 100%;
  height: 70px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    margin: 0 23px;
    font-size: 22px;
    color: rgba(0, 0, 0, 0.8);
    &:first-child {
      font-family: "Times New Roman", Times, serif;
      letter-spacing: 1px;
    }
  }
`;

const LoginBoxContent = styled.div`
  width: 520px;
  height: 550px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-left: 80px;
`;

const Div = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  span {
    &:first-child {
      font-size: 24px;
      font-weight: 600;
      color: black;
    }
    &:last-child {
      font-size: 23px;
      margin-top: 15px;
      color: #69d802;
      font-weight: 600;
    }
  }
`;

const Form = styled.form`
  width: 100%;
  height: 440px;
`;

const Input = styled.input<{ isvalid: string }>`
  width: 440px;
  height: 50px;
  border-radius: 20px;
  margin: 10px 0;
  border: 1px solid
    ${({ isvalid }) =>
      isvalid === "true"
        ? "rgba(21, 83, 177, 0.2)"
        : "rgba(211, 44, 44, 0.61)"};
  outline: none;
  text-indent: 15px;
  font-size: 15px;
  &:focus {
    border: 3px solid
      ${({ isvalid }) =>
        isvalid === "true"
          ? "rgba(21, 83, 177, 0.2)"
          : "rgba(211, 44, 44, 0.61)"};
  }
`;

const Button = styled.button`
  width: 440px;
  height: 60px;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
  margin: 8px 0;
  cursor: pointer;
  border: none;
  background-color: #69d802;
  &:first-child {
    color: white;
    background-color: ${brownColor};
  }
  &:last-child {
    color: white;
    background-color: #df4d4d;
  }
`;

const ErrorMsg = styled.span`
  display: block;
  color: #df4d4d;
  font-size: 15px;
  font-weight: 600;
`;

const PhotoDiv = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
`;

const Photo = styled.div<{ url: string | null }>`
  width: 50px;
  height: 50px;
  border-radius: 10%;
  margin-top: 10px;
  margin-right: 10px;
  background-image: url(${({ url }) => url});
  background-size: cover;
  background-position: center;
`;

const Label = styled.label`
  margin: 15px 0 0px 0;
  font-weight: bold;
  font-size: 15px;
  color: #0095f6;
  display: inline-block;
  cursor: pointer;
`;

export const overlayVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

interface FormData {
  name: String;
  latitude: String;
  longitude: String;
  categories: String;
}

interface Category {
  id: number;
  name: string;
}

interface CoffeeShopInt {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  categories: [Category];
}

const Detail = () => {
  const { id } = useParams();
  const [errorMsg, setErrorMsg] = useState("");
  const [photoFile, setPhotoFile] = useState();
  const [newPhoto, setPhoto] = useState("");
  const [coffeeShop, setCoffeeShop] = useState<CoffeeShopInt>();
  const navigate = useNavigate();

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onCompleted1 = (data: any) => {
    const { seeCoffeeShop } = data;
    setCoffeeShop(seeCoffeeShop);
  };
  const onCompleted2 = (data: any) => {
    const {
      editCoffeeShop: { ok, error },
    } = data;
    if (!ok) {
      setErrorMsg(error);
    } else {
      navigate("/");
      window.location.reload();
    }
  };
  const onCompleted3 = (data: any) => {
    const {
      deleteCoffeeShop: { ok, error },
    } = data;
    if (!ok) {
      setErrorMsg(error);
    } else {
      navigate("/");
      window.location.reload();
    }
  };

  const [seeCoffeeShop] = useMutation(SEE_COFFEESHOP_MUTATION, {
    onCompleted: onCompleted1,
  });
  const [editCoffeeShop, loading] = useMutation(EDIT_COFFEESHOP_MUTATION, {
    onCompleted: onCompleted2,
  });
  const [deleteCoffeeShop] = useMutation(DELETE_COFFEESHOP_MUTATION, {
    onCompleted: onCompleted3,
  });

  useEffect(() => {
    seeCoffeeShop({ variables: { id: Number(id) } });
  }, []);
  const categories = coffeeShop?.categories.map((value) => value.name);
  const placeholder = categories?.join(" ");

  const onSubmitValid = () => {
    const { name, latitude, longitude, categories } = getValues();
    editCoffeeShop({
      variables: {
        shopId: Number(id),
        ...(name && { name }),
        ...(latitude && { latitude }),
        ...(longitude && { longitude }),
        ...(categories && { categories }),
        ...(photoFile !== undefined && { photo: photoFile }),
      },
    });
  };

  const onDeleteClicked = (id: number) => {
    deleteCoffeeShop({ variables: { shopId: id } });
  };

  const onChange = (e: any) => {
    if (e.target.files.length === 0) return;
    const {
      target: {
        files: [file],
      },
    } = e;
    setPhotoFile(file);

    var reader = new FileReader();
    reader.onload = function (event: any) {
      setPhoto(event.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <>
      {coffeeShop ? (
        <Overlay
          variants={overlayVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <LoginBox>
            <LoginBoxHeader>
              <span>Edit & Delete</span>
            </LoginBoxHeader>
            <LoginBoxContent>
              <Form onSubmit={handleSubmit(onSubmitValid)}>
                <Input
                  isvalid={!errors?.name ? "true" : "false"}
                  {...register("name")}
                  type="text"
                  name="name"
                  placeholder={coffeeShop?.name}
                ></Input>
                <Input
                  {...register("latitude")}
                  name="latitude"
                  isvalid={!errors?.latitude ? "true" : "false"}
                  type="text"
                  placeholder={coffeeShop?.latitude}
                ></Input>
                <Input
                  {...register("longitude")}
                  name="longitude"
                  isvalid={!errors?.longitude ? "true" : "false"}
                  type="text"
                  placeholder={coffeeShop?.longitude}
                ></Input>
                <Input
                  {...register("categories")}
                  name="categories"
                  isvalid={!errors?.categories ? "true" : "false"}
                  type="text"
                  placeholder={placeholder}
                ></Input>
                <ErrorMsg>{errorMsg}</ErrorMsg>
                <PhotoDiv
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "30px",
                  }}
                >
                  {newPhoto ? <Photo url={newPhoto}></Photo> : null}
                  <Label className="signup-profileImg-label" htmlFor="photoImg">
                    이미지 업로드
                  </Label>
                  <input
                    style={{ display: "none" }}
                    type="file"
                    accept="image/*"
                    id="photoImg"
                    onChange={(e: any) => onChange(e)}
                  />
                </PhotoDiv>
                <Div style={{ marginTop: "50px" }}>
                  <Button
                    disabled={loading.loading ? true : false}
                    style={{ opacity: loading.loading ? "0.5" : "1" }}
                  >
                    커피숍 등록
                  </Button>
                  <Button onClick={() => onDeleteClicked(coffeeShop.id)}>
                    커피숍 삭제
                  </Button>
                </Div>
              </Form>
            </LoginBoxContent>
          </LoginBox>
        </Overlay>
      ) : null}
    </>
  );
};

export default Detail;
