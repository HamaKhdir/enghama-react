
const SEO = ({ title, description, name, type }) => {
    return (
        // تەنها فرەگمێنتێکی ئاسایی React بەکاردەهێنین
        <>
            {/* React 19 خۆی ئەم تاگانە دەباتە ناو <head> */}
            <title>{title}</title>
            <meta name='description' content={description} />
            
            {/* Open Graph Meta Tags */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={type || 'website'} />
            
            {/* Twitter Card Meta Tags */}
            <meta name="twitter:creator" content={name || '@YourTwitterHandle'} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
        </>
    );
};

export default SEO;