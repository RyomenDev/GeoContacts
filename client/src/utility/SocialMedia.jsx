import React from "react";
import { Icon } from "@iconify/react";
import AboutUsData from "../Data/ContactData.jsx";
import styled from "styled-components";

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  border-radius: 50%;
  background-color: ${(props) => props.backgroundColor};
  transition: background-color 0.3s ease-in;

  &:hover {
    background-color: ${({ theme }) => theme};
  }

  svg {
    color: white;
    font-size: 20px;
  }
`;

const SocialMediaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  justify-items: center;
  align-items: center;
  width: 100%;
  max-width: 400px;
  margin: auto;

  @media (min-width: 754px) {
    grid-template-columns: repeat(2, 1fr);
    max-width: 300px;
  }

  @media (min-width: 768px) {
    max-width: 320px;
  }

  @media (min-width: 1024px) {
    max-width: 360px;
  }
`;

export default function SocialMedia() {
  const { socialMediaLinks } = AboutUsData;

  return (
    <SocialMediaGrid>
      {socialMediaLinks.map((media, index) => {
        const isEmail = media.name?.toLowerCase() === "gmail";
        const href = isEmail ? `mailto:${media.link}` : media.link;

        return (
          <a
            key={index}
            href={href}
            target={isEmail ? "_self" : "_blank"}
            rel={isEmail ? undefined : "noopener noreferrer"}
            aria-label={media.name || "social media link"}
          >
            <IconWrapper
              backgroundColor={media.backgroundColor}
              theme="#ffffff"
            >
              <Icon icon={media.icon} />
            </IconWrapper>
          </a>
        );
      })}
    </SocialMediaGrid>
  );
}
