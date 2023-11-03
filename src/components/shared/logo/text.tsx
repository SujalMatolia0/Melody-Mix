import { Stack, Image, Text, Group } from "@mantine/core";
import Link from "next/link";

interface LogoTxtProps {
  size?: string;
  linkEnabled?: boolean;
  href?: string;
  admin?: boolean;
}

export const LogoTxt = ({
  size = "sm",
  linkEnabled = true,
  href = "/",
  admin = false,
}: LogoTxtProps) => {
  return (
    <Stack gap={0}>
      <Group>
        <Image
          className="image-style"
          src="/fav.svg"
          alt="Description of the SVG image"
        />

        <Text
          className="text-style"
          component={Link}
          href={linkEnabled ? href : ""}
          size={size}
          fw="bold"
          style={{
            outline: "none",
            pointerEvents: linkEnabled ? "auto" : "none",
          }}
        >
          Melody Mix
        </Text>
      </Group>
      {admin && (
        <Text size="xs" w="bold" color="red">
          ADMIN
        </Text>
      )}
    </Stack>
  );
};
