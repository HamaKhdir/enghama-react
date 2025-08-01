import useApi from '../hooks/useApi';
import PostCard from '../components/PostCard';
import styled from 'styled-components';
import { device } from '../styles/breakpoints';

const PageContainer = styled.div`
    max-width: 960px;
    margin: 2rem auto;
    padding: 0 1rem;
`;

const PageTitle = styled.h1`
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2.5rem;
    color: ${props => props.theme.primary_color};
  @media ${device.tablet} {
    font-size: 2rem;
  }
`;

const PostsList = styled.div`
    display: grid;
    gap: 2rem;
`;

const LoadingMessage = styled.p`
    text-align: center;
    font-size: 1.2rem;
`;

const ErrorMessage = styled.p`
    text-align: center;
    font-size: 1.2rem;
    color: red;
`;

const BlogPage = () => {
    // بەکارهێنانی Custom Hook بۆ وەرگرتنی پۆستەکان
    const { data: posts, loading, error } = useApi('blog/posts/');

    if (loading) return <LoadingMessage>Loading blog posts...</LoadingMessage>;
    if (error) return <ErrorMessage>Failed to load posts. Please try again later.</ErrorMessage>;

    return (
        <PageContainer>
            <PageTitle>The Blog</PageTitle>
            <PostsList>
                {posts && posts.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
            </PostsList>
        </PageContainer>
    );
};

export default BlogPage;