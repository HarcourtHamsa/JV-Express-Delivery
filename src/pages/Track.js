import React from "react";
import {
  Box,
  Container,
  Text,
  FormControl,
  Input,
  Button,
  Flex,
  Center,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import { FadeLoader } from "react-spinners";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import SecondaryNav from "../components/SecondaryNav";
import { firestore } from "../firebase";
import trackImg from "../assets/images/track.jpg";
import { useLocation } from "react-router-dom";

function Track() {
  const [trackingID, setTrackingID] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [isSuccessful, setIsSuccessful] = React.useState(false);
  // eslint-disable-next-line
  const [errorMsg, setErrorMsg] = React.useState("");
  const [packageInfo, setPackageInfo] = React.useState({});

  let location = useLocation();

  const handleTrackingID = (e) => {
    setTrackingID(e.target.value);
  };

  // funtion to fetch data from firestore
  const fetchData = async (id) => {
    let result = new Promise((resolve, reject) => {
      firestore
        .collection("users")
        .where("trackingId", "==", id)
        .get()
        .then((snapShot) => {
          snapShot.forEach((doc) => {
            resolve(doc.data());
          });
        })
        .catch((err) => {
          console.log("Hei God");
          reject(err);
        });
    });

    return await result;
  };

  function secondsToDateConverter(secs) {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    return t.toDateString();
  }

  async function getData(id) {
    await fetchData(id)
      .then((data) => {
        setPackageInfo(data);
        setIsSuccessful(true);
        return data;
      })
      .catch((err) => {
        console.log("Hei God");
        setLoading(false);
        alert(err);
      })
      .finally(() => setLoading(false));
  }

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    setLoading(true); // show loading icon
    await getData(trackingID);
    setLoading(false); // remove loading icon
  };

  React.useEffect(() => {
    const id = location.state?.id;

    async function func(id) {
      if (typeof id === "string") {
        // setTrackingID(id);
        console.log(id);
        setLoading(true);
        try {
          console.log("tracking id from useEffect: ", trackingID);
          await getData(id);
        } catch (error) {
          console.log("Hei God");
          setLoading(false);
        } finally {
          setLoading(false);
        }
      }
    }

    func(id);
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <Navbar />
      <SecondaryNav />
      <Box
        h={{base: '400', md: '300'}}
        bg="gray.800"
        bgImage={trackImg}
        bgPos="center"
        bgSize="cover"
      >
        <Container maxW={"6xl"} h="inherit">
          <Center alignItems="center" justifyContent="flex-start" h="inherit">
            <Box>
              <Text fontSize="3xl" color="white">
                Track an Item
              </Text>
              <Text
                fontSize={"sm"}
                w={{ base: "inherit", md: "md" }}
                mb="5"
                color="white"
              >
                Our tracking tools give you control over your shipments, by
                helping you stay informed so you can ship with confidence.
              </Text>

              <form onSubmit={handleFormSubmission}>
                <Flex>
                  <FormControl id="trackingNumber">
                    <Input
                      type="text"
                      placeholder="Enter tracking number"
                      variant="filled"
                      color="black"
                      size="lg"
                      rounded={0}
                      borderLeftRadius={6}
                      value={trackingID}
                      onChange={handleTrackingID}
                      required
                      _focus={{
                        backgroundColor: "white",
                      }}
                    />
                  </FormControl>
                  <Button
                    fontWeight="normal"
                    bg="#D40511"
                    color="white"
                    size="lg"
                    type="submit"
                    fontSize={"sm"}
                    rounded={0}
                    borderRightRadius={6}
                  >
                    Track now
                  </Button>
                </Flex>
              </form>
            </Box>
          </Center>
        </Container>
      </Box>

      <Box h="fit-content" textAlign="center" bg="gray.50">
        <Center h="inherit" py={10}>
          <Box>
            <Center>
              <Text>{errorMsg}</Text>
              {loading && <FadeLoader radius={0} />}

              {isSuccessful && (
                <Box h="fit-content">
                  <SimpleGrid
                    h="fit-content"
                    w="80vw"
                    m="auto"
                    templateColumns={{
                      sm: "1fr 1fr 1fr",
                      md: " 1fr 1fr 1fr",
                    }}
                    spacing={"10"}
                    fontSize="sm"
                    textAlign={"initial"}
                  >
                    <Box
                      h="fit-content"
                      borderWidth="thin"
                      bg="white"
                      w={{ base: "100%" }}
                    >
                      <Box h="20%" bg="#D40511" p={3}>
                        <Text color={"white"}>Shippment Details</Text>
                      </Box>

                      <Stack spacing={3} p={3}>
                        <Text>Quantity : {packageInfo.quantity} </Text>
                        <Text>Weight : {packageInfo.weight}</Text>
                        <Text>Service Type : {packageInfo.serviceType}</Text>
                        <Text>Description : {packageInfo.description}</Text>
                      </Stack>
                    </Box>

                    <Box
                      h="fit-content"
                      borderWidth="thin"
                      bg="white"
                      w={{ base: "100%" }}
                    >
                      <Box h="20%" bg="#D40511" p={3}>
                        <Text color={"white"}>Destination</Text>
                      </Box>

                      <Stack spacing={3} p={3}>
                        <Text>Receiver Name : {packageInfo.to} </Text>
                        <Text>
                          Receiver Email : {packageInfo.receiverEmail}
                        </Text>
                        <Text>
                          Receiver Address : {packageInfo.receiverAddress}
                        </Text>
                        <Text>
                          Expected Date of Delivery :
                          {secondsToDateConverter(
                            packageInfo.dateOfDelivery.seconds
                          )}
                        </Text>
                      </Stack>
                    </Box>

                    <Box
                      h="fit-content"
                      borderWidth="thin"
                      bg="white"
                      w={{ base: "100%" }}
                    >
                      <Box h="20%" bg="#D40511" p={3}>
                        <Text color={"white"}>Origin</Text>
                      </Box>

                      <Stack spacing={3} p={3}>
                        <Text>Sender Name : {packageInfo.from} </Text>
                        <Text>
                          Sender Address : {packageInfo.senderAddress}
                        </Text>
                        <Text>
                          Shippment Date :{" "}
                          {secondsToDateConverter(
                            packageInfo.shippmentDate.seconds
                          )}
                        </Text>
                      </Stack>
                    </Box>
                  </SimpleGrid>

                  <Table
                    variant="striped"
                    fontSize={"sm"}
                    mt="10"
                    maxW={"full"}
                  >
                    <TableCaption>
                      Real time information of package
                    </TableCaption>
                    <Thead bg="#D40511">
                      <Tr>
                        <Th
                          color={"white"}
                          fontSize={"sm"}
                          textTransform={"capitalize"}
                        >
                          From
                        </Th>
                        <Th
                          color={"white"}
                          fontSize={"sm"}
                          textTransform={"capitalize"}
                        >
                          To
                        </Th>
                        <Th
                          color={"white"}
                          fontSize={"sm"}
                          textTransform={"capitalize"}
                        >
                          Tracking ID
                        </Th>
                        <Th
                          color={"white"}
                          fontSize={"sm"}
                          textTransform={"capitalize"}
                        >
                          Status
                        </Th>
                        <Th
                          color={"white"}
                          fontSize={"sm"}
                          textTransform={"capitalize"}
                        >
                          Current Location
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody bg="white" overflowX={"scroll"}>
                      <Tr bg="white">
                        <Td>{packageInfo.from}</Td>
                        <Td>{packageInfo.to}</Td>
                        <Td>{packageInfo.trackingId}</Td>
                        <Td>{packageInfo.status}</Td>
                        <Td>{packageInfo.currentLocation}</Td>
                      </Tr>
                    </Tbody>
                  </Table>

                  <Button my={5} fontWeight="normal" colorScheme="green">
                    <a
                      href={`${packageInfo.imageURL.secure_url}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View package Image
                    </a>
                  </Button>
                </Box>
              )}

              {!loading && !isSuccessful && (
                <Box>
                  <Center>
                    <svg
                      _ngcontent-eao-c45=""
                      focusable="false"
                      alt=""
                      aria-hidden="true"
                      width="149"
                      height="149"
                      viewBox="0 0 149 149"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        _ngcontent-eao-c45=""
                        d="M74.5 149C115.645 149 149 115.645 149 74.5C149 33.3548 115.645 0 74.5 0C33.3548 0 0 33.3548 0 74.5C0 115.645 33.3548 149 74.5 149Z"
                        fill="white"
                      ></path>
                      <path
                        _ngcontent-eao-c45=""
                        fillRule="evenodd"
                        clip-rule="evenodd"
                        d="M92.5185 107.993H39.4037C38.1286 107.993 37.0947 106.99 37.0947 105.753V54.193C37.0947 52.9562 38.1286 51.9517 39.4037 51.9517H92.5185C93.7927 51.9517 94.8275 52.9562 94.8275 54.193V105.753C94.8275 106.99 93.7927 107.993 92.5185 107.993Z"
                        fill="#D4D7D9"
                      ></path>
                      <path
                        _ngcontent-eao-c45=""
                        fillRule="evenodd"
                        clip-rule="evenodd"
                        d="M53.5104 52.3398H39.5861C39.5861 52.3398 37.447 52.3398 36.0361 50.7792L29.5876 43.6458C29.5876 43.6458 28.1778 42.0851 30.3159 42.0851H44.2412C44.2412 42.0851 46.3793 42.0851 47.7902 43.6458L54.2386 50.7792C54.2386 50.7792 55.6495 52.3398 53.5104 52.3398Z"
                        fill="#E2E4E6"
                      ></path>
                      <path
                        _ngcontent-eao-c45=""
                        fillRule="evenodd"
                        clip-rule="evenodd"
                        d="M110.073 52.1156H56.9911C56.9911 52.1156 54.852 52.1156 56.2204 50.5197L62.0712 43.692C62.0712 43.692 63.4386 42.0962 65.5777 42.0962H118.659C118.659 42.0962 120.798 42.0962 119.43 43.692L113.579 50.5197C113.579 50.5197 112.212 52.1156 110.073 52.1156Z"
                        fill="#D4D7D9"
                      ></path>
                      <path
                        _ngcontent-eao-c45=""
                        fillRule="evenodd"
                        clip-rule="evenodd"
                        d="M111.883 105.753C111.883 106.99 110.849 107.993 109.574 107.993H56.4597C55.1845 107.993 54.1506 106.99 54.1506 105.753V54.193C54.1506 52.9562 55.1845 51.9517 56.4597 51.9517H109.574C110.849 51.9517 111.883 52.9562 111.883 54.193V105.753Z"
                        fill="#E2E4E6"
                      ></path>
                      <path
                        _ngcontent-eao-c45=""
                        fillRule="evenodd"
                        clip-rule="evenodd"
                        d="M95.5151 65.9445C94.4763 68.0903 92.253 69.5732 89.678 69.5732C86.1088 69.5732 83.2153 66.7242 83.2153 63.2097C83.2153 59.6952 86.1088 56.8461 89.678 56.8461C92.1 56.8461 94.2108 58.158 95.3175 60.0994C94.6347 60.126 93.9581 60.2156 93.2916 60.3911C92.4756 59.3036 91.1688 58.5987 89.6949 58.5987C87.223 58.5987 85.2192 60.5859 85.2192 63.0343C85.2192 65.4827 87.223 67.4698 89.6949 67.4698C90.7235 67.4698 91.6708 67.1265 92.4266 66.5494C93.4253 66.14 94.4607 65.9677 95.5151 65.9445ZM97.8482 66.0982C98.9141 66.245 99.986 66.4757 101.047 66.704L101.066 66.7081L101.093 66.7139C102.829 67.0877 104.604 67.4698 106.321 67.4698C107.208 67.4698 108.079 67.3688 108.922 67.1123L108.814 64.9982C106.425 65.7282 103.862 65.1753 101.149 64.5903L101.142 64.5888L101.105 64.5809C100.181 64.3826 99.248 64.1825 98.3164 64.0364C98.3429 63.7643 98.3565 63.4886 98.3565 63.2097C98.3565 62.9522 98.3449 62.6973 98.3223 62.4456C99.2315 62.5902 100.143 62.7864 101.047 62.9809L101.066 62.9851L101.093 62.9908C102.829 63.3647 104.604 63.7468 106.321 63.7468C107.208 63.7468 108.079 63.6457 108.922 63.3892L108.814 61.2751C106.425 62.0051 103.862 61.4522 101.149 60.8672L101.142 60.8657L101.135 60.8643C100.036 60.6277 98.9253 60.3884 97.8181 60.24C96.5927 56.9845 93.4105 54.6644 89.678 54.6644C84.885 54.6644 80.9995 58.4902 80.9995 63.2097C80.9995 67.9291 84.885 71.755 89.678 71.755C93.4415 71.755 96.6454 69.3962 97.8482 66.0982ZM96.0634 62.2224C96.1143 62.5441 96.1407 62.8739 96.1407 63.2097C96.1407 63.4151 96.1308 63.6183 96.1115 63.8187C95.428 63.7997 94.7491 63.8345 94.0787 63.9455C94.1407 63.6514 94.1733 63.3466 94.1733 63.0343C94.1733 62.8012 94.1551 62.5722 94.1201 62.3488C94.759 62.2417 95.4082 62.2064 96.0634 62.2224Z"
                        fill="#D4D7D9"
                      ></path>
                      <path
                        _ngcontent-eao-c45=""
                        fillRule="evenodd"
                        clip-rule="evenodd"
                        d="M61 89H78C79.1046 89 80 89.8954 80 91V103C80 104.105 79.1046 105 78 105H61C59.8954 105 59 104.105 59 103V91C59 89.8954 59.8954 89 61 89ZM62.3922 99.9036C61.8399 99.9036 61.3922 100.351 61.3922 100.904V101.715C61.3922 102.267 61.8399 102.715 62.3922 102.715H76.7254C77.2777 102.715 77.7254 102.267 77.7254 101.715V100.904C77.7254 100.351 77.2777 99.9036 76.7254 99.9036H62.3922ZM62.3922 95.6856C61.8399 95.6856 61.3922 96.1333 61.3922 96.6856V97.4967C61.3922 98.049 61.8399 98.4967 62.3922 98.4967H76.7254C77.2777 98.4967 77.7254 98.049 77.7254 97.4967V96.6856C77.7254 96.1333 77.2777 95.6856 76.7254 95.6856H62.3922ZM69.9662 91.4677C69.4139 91.4677 68.9662 91.9154 68.9662 92.4677V93.2788C68.9662 93.8311 69.4139 94.2788 69.9662 94.2788H76.7254C77.2777 94.2788 77.7254 93.8311 77.7254 93.2788V92.4677C77.7254 91.9154 77.2777 91.4677 76.7254 91.4677H69.9662Z"
                        fill="white"
                      ></path>
                    </svg>
                  </Center>
                  <Text>Any items you're tracking will appear here</Text>
                </Box>
              )}
            </Center>
          </Box>
        </Center>
      </Box>

      {/* new code here */}

      <Footer />
    </div>
  );
}

export default Track;
