import { Alert, AlertDescription, CloseButton, Link } from "@chakra-ui/react";

function InfoBar() {
  return (
    <Alert status="warning">
      <AlertDescription>
        <Link fontSize="sm">
          We're still delivering but COVID-19 is impacting our services more
          than usual. Delays may be experienced.
        </Link>
      </AlertDescription>

      <CloseButton position="absolute" right="8px" top="8px" />
    </Alert>
  );
}

export default InfoBar;
