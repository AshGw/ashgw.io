import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc';
import React from 'react';
// to add some styling here
export default function StyledMDX({ components, ...props }: MDXRemoteProps) {
  return <MDXRemote {...props} components={{ ...components }} />;
}
