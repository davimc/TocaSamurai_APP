import Subscription from "@/models/subscriptions";
import { Badge, Box, Container, Divider, Stack } from "@mui/material";

interface StructuredTableCellProps {
  subscriptions: Subscription[];
}

export default function StructuredSubscriptionTableCell(
  props: StructuredTableCellProps,
) {
  return (
    <Box className="flex flex-wrap gap-1">
      {props.subscriptions.map((sm, idx) => (
        <Container key={idx}>
          <Divider orientation="vertical" flexItem />

          <Stack
            key={idx}
            color="secondary"
            className="bg-primary/20 text-primary"
          >
            {sm.plan.martialArt} - {sm.plan.title}
          </Stack>
        </Container>
      ))}
    </Box>
  );
}
