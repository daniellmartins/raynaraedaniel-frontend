import React from "react";
import Link from "next/link";
import styled, { css } from "styled-components";

export const MenuItem = ({ label, href, as, prefetch, scroll }) => (
  <StyledMenuItem>
    <Link scroll={scroll} prefetch={prefetch} href={href} as={as}>
      <a>{label}</a>
    </Link>
  </StyledMenuItem>
);

MenuItem.defaultProps = {
  prefetch: false,
  scroll: true
};

const StyledMenuItem = styled.li`
  a {
    color: #eeeeee;
    font-size: 0.8125rem;
    text-align: center;
    text-transform: uppercase;
    text-decoration: none;

    padding: 0.75rem 1rem;

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
