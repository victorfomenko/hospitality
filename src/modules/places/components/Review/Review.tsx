import styled from '@emotion/styled';
import React, { FunctionComponent } from 'react';
import { IPlaceReview } from '../../../../dux/init/initApi';
import Rating from '../Rating';

const Review: FunctionComponent<IPlaceReview> = ({
  profile_photo_url,
  author_name,
  text,
  relative_time_description,
  rating,
}): JSX.Element => {
  return (
    <Wrapper>
      <Avatar>
        <img src={profile_photo_url} alt="review" />
      </Avatar>
      <Content>
        <ContentTop>
          <Name>{author_name}</Name>
          <div>
            <span>
              <StyledRating placeholderRating={rating} />
            </span>
            <CommentDate>{relative_time_description}</CommentDate>
          </div>
        </ContentTop>
        <Comment>{text}</Comment>
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: table;
  table-layout: fixed;
  width: 100%;
  margin-bottom: 20px;
`;

const Avatar = styled.div`
  display: table-cell;
  vertical-align: top;
  width: 48px;
  img {
    border-radius: 24px;
    box-shadow: 0 1px 2px #8d8d8d;
    background-size: contain;
    height: 48px;
    margin-top: 10px;
    width: 48px;
    vertical-align: middle;
  }
`;

const Content = styled.div`
  display: table-cell;
  vertical-align: top;
  padding-left: 9px;
`;

const ContentTop = styled.div`
  display: table-cell;
  table-layout: fixed;
  width: 100%;
  height: 55px;
  line-height: 24px;
  vertical-align: top;
  vertical-align: middle;
`;

const Name = styled.span`
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
`;

const CommentDate = styled.span`
  color: #aaa;
  display: inline-block;
  font-size: 12px;
  font-weight: normal;
  margin-left: 2px;
  vertical-align: middle;
  white-space: nowrap;
`;

const Comment = styled.div`
  word-wrap: break-word;
  hyphens: auto;
  font-size: 14px;
  line-height: 24px;
`;

const StyledRating = styled(Rating)`
  svg {
    width: 10px;
    height: 10px;
    margin-right: 2px;
  }
`;

export default Review;
