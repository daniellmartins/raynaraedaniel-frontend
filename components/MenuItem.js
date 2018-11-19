import React from "react";
import Link from "next/link";
import styled, { css } from "styled-components";

export const MenuItem = ({ label, href, as }) => (
  <StyledMenuItem>
    <Link href={href} as={as}>
      <a>{label}</a>
    </Link>
  </StyledMenuItem>
);

const StyledMenuItem = styled.li`
  a {
    color: #eeeeee;
    font-size: 0.8125rem;
    text-align: center;
    text-transform: uppercase;
    text-decoration: none;

    padding: 0.75rem 1rem;

    transition: color 0.2s ease;

    &:hover {
      color: #ffffff;
    }

    ${({ theme }) =>
      theme.headerFixed &&
      css`
        color: ${({ theme }) => theme.color.text};

        &:hover {
          color: ${({ theme }) => theme.color.primary};
        }
      `}
  }
`;
