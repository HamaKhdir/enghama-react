import { useParams, Link } from 'react-router-dom';
import useApi from '../hooks/useApi';
import styled from 'styled-components';
import { device } from '../styles/breakpoints';

// --- Styled Components ---

const DetailContainer = styled.div`
  max-width: 800px;
  margin: 3rem auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

const PostHeader = styled.header`
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #eee;
`;

const PostTitle = styled.h1`
  font-size: 2.8rem;
  color: ${props => props.theme.primary_color};
  line-height: 1.2;
  margin-bottom: 1rem;
  @media ${device.tablet} {
    font-size: 2rem; // قەبارەی بچووکتر
  }
`;

const PostMeta = styled.p`
  color: #888;
  font-size: 0.9rem;
`;

const PostContent = styled.div`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #333;
  text-align: justify; 

  p {
    margin-bottom: 1.5rem;
  }

  h2, h3 {
    margin-top: 2.5rem;
    margin-bottom: 1rem;
    color: ${props => props.theme.primary_color};
  }
  @media ${device.mobile} { // بەکارهێنانی Breakpointـەکان
    font-size: 1rem; // بچووککردنەوەی فۆنت لەسەر مۆبایل
  }

`;

const TagList = styled.div`
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const Tag = styled(Link)`
  background-color: ${props => props.theme.secondary_color}20; /* 20 for opacity */
  color: ${props => props.theme.secondary_color};
  padding: 0.4rem 0.9rem;
  border-radius: 20px;
  font-size: 0.9rem;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.theme.secondary_color}40;
  }
`;

const BackLink = styled(Link)`
  display: block;
  margin-top: 3rem;
  color: ${props => props.theme.primary_color};
  text-decoration: none;
  font-weight: bold;
  
  &:hover {
    text-decoration: underline;
  }
`;


 

// --- Main Component ---

const PostDetailPage = () => {
    const { slug } = useParams();
    const { data: post, loading, error } = useApi(`blog/posts/${slug}/`);

    if (loading) return <p>Loading post...</p>;
    if (error) return <p>Error loading post.</p>;
    if (!post) return <p>Post not found.</p>;

    const postDate = new Date(post.created_on).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <DetailContainer>
            <PostHeader>
                <PostTitle>{post.title}</PostTitle>
                <PostMeta>
                    By {post.author_name} on {postDate}
                </PostMeta>
            </PostHeader>

            <PostContent dangerouslySetInnerHTML={{ __html: post.content }} />

            {post.tags && post.tags.length > 0 && (
                <TagList>
                    {post.tags.map(tag => (
                        <Tag key={tag.id} to={`/blog/tags/${tag.name}`}>
                            {tag.name}
                        </Tag>
                    ))}
                </TagList>
            )}

            <BackLink to="/blog">Back to All Posts</BackLink>
        </DetailContainer>
    );
};

export default PostDetailPage;