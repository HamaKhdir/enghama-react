import styled from 'styled-components';
import { Link } from 'react-router-dom';

const CardContainer = styled(Link)`
    display: block;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.08);
    overflow: hidden;
    transition: all 0.3s ease;
    text-decoration: none;
    color: inherit;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 16px rgba(0,0,0,0.12);
    }
`;

const CardContent = styled.div`
    padding: 1.5rem;
`;

const PostTitle = styled.h3`
    font-size: 1.5rem;
    color: ${props => props.theme.primary_color};
    margin-bottom: 0.75rem;
`;

const PostMeta = styled.p`
    font-size: 0.9rem;
    color: #777;
    margin-bottom: 1rem;
`;

const PostExcerpt = styled.p`
    font-size: 1rem;
    line-height: 1.6;
`;

const PostCard = ({ post }) => {
    // کورتکردنەوەی ناوەڕۆک بۆ پیشاندان
    const excerpt = post.content.substring(0, 150) + '...';
    // فۆرماتکردنی بەروار
    const postDate = new Date(post.created_on).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <CardContainer to={`/blog/${post.slug}`}>
            <CardContent>
                <PostTitle>{post.title}</PostTitle>
                <PostMeta>
                    By {post.author_name} on {postDate}
                </PostMeta>
                <PostExcerpt>{excerpt}</PostExcerpt>
            </CardContent>
        </CardContainer>
    );
};

export default PostCard;