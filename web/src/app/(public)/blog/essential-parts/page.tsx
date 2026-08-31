export default function ArticlePage() {
  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '60px 24px 120px' }}>
      <article style={{ fontSize: '18px', lineHeight: '1.7', color: 'var(--ink)' }}>
        
        <header style={{ marginBottom: '48px', borderBottom: '1px solid var(--line)', paddingBottom: '32px' }}>
          <div style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--brass-deep)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
            Developer Workflow
          </div>
          <h1 style={{ fontSize: '42px', lineHeight: '1.15', marginBottom: '24px' }}>
            Essential Parts of a Website: The Complete Website Anatomy Guide
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: 'var(--muted)' }}>
            <span style={{ fontWeight: 'bold', color: 'var(--ink)' }}>By Alison Brunk</span>
            <span>&middot;</span>
            <span>Published October 14, 2025</span>
            <span>&middot;</span>
            <span>8 min read</span>
          </div>
        </header>

        <p style={{ marginBottom: '24px', fontSize: '20px' }}>
          One of the best starting points for designing or building a website is understanding its main parts. In this article, we’ll break down the anatomy of a website, from the sections visitors see on the screen to the behind-the-scenes elements that keep it running.
        </p>
        <p style={{ marginBottom: '40px' }}>
          Whether you’re a developer or a marketer, understanding these components will make it easier to build a site that’s both effective and enjoyable for users.
        </p>

        <h2 style={{ fontSize: '28px', marginTop: '48px', marginBottom: '20px' }}>The main parts of a website (what people actually see)</h2>
        <p style={{ marginBottom: '24px' }}>
          A good website is made up of a few main components that work together to create the full experience. These are the parts people notice right away.
        </p>

        <h3 style={{ fontSize: '22px', marginTop: '32px', marginBottom: '16px' }}>Header</h3>
        <p style={{ marginBottom: '24px' }}>
          The header is the top section of a website that appears on every page. It usually includes the logo, main menu, and sometimes a search bar or contact links. The header helps users orient themselves and easily access essential parts of the site.
        </p>
        <p style={{ marginBottom: '24px' }}>
          Headers can be made static (fixed at the top of the page) or sticky, which means they remain visible as the user scrolls down. Use sticky headers if you want users to have constant access to navigation links without needing to scroll back up.
        </p>
        <p style={{ marginBottom: '24px' }}>
          On desktop screens, headers display a full navigation menu with dropdowns or multiple links. However, on mobile devices, the menu is hidden to save space and only appears when a user taps an icon, typically a hamburger menu.
        </p>

        <h3 style={{ fontSize: '22px', marginTop: '32px', marginBottom: '16px' }}>Navigation</h3>
        <p style={{ marginBottom: '24px' }}>
          Technically, the navigation, or menu, is part of the header. However, it’s such a key component that it deserves its own section. This menu helps users find their way around the website. It usually includes links to main pages like Home, About, Services, and Contact.
        </p>

        <h3 style={{ fontSize: '22px', marginTop: '32px', marginBottom: '16px' }}>Hero section</h3>
        <p style={{ marginBottom: '24px' }}>
          The hero section is usually the large, prominent area near the top of a webpage. It’s often the first thing visitors see when they land on the site. This section typically includes a headline, a brief message or subheadline, a strong call to action (CTA), and an eye-catching image, video, or animation.
        </p>
        <p style={{ marginBottom: '24px' }}>
          The hero section’s main goal is to grab attention quickly and communicate the website’s purpose or key offer.
        </p>

        <h3 style={{ fontSize: '22px', marginTop: '32px', marginBottom: '16px' }}>Main content area</h3>
        <p style={{ marginBottom: '24px' }}>
          The main content area is where most of the page’s information lives. This section contains text, images, videos, and other media that explain your products, services, or message in detail.
        </p>

        <h3 style={{ fontSize: '22px', marginTop: '32px', marginBottom: '16px' }}>Sidebar</h3>
        <p style={{ marginBottom: '24px' }}>
          The sidebar is an optional section that runs vertically along the left or right side of a webpage. It’s often used to show extra content or navigation links that support the main section, without getting in the way of what visitors are actually there to read.
        </p>
        <ul style={{ marginBottom: '24px', paddingLeft: '24px' }}>
          <li style={{ marginBottom: '8px' }}>Links to recent or popular posts</li>
          <li style={{ marginBottom: '8px' }}>Category filters or topic tags</li>
          <li style={{ marginBottom: '8px' }}>Advertisements or promotional banners</li>
          <li style={{ marginBottom: '8px' }}>Social media feeds or follow buttons</li>
        </ul>

        <h3 style={{ fontSize: '22px', marginTop: '32px', marginBottom: '16px' }}>Call-to-action (CTA) elements</h3>
        <p style={{ marginBottom: '24px' }}>
          Call-to-action elements guide visitors to take specific actions on your website. These actions could be signing up for a newsletter, making a purchase, contacting your team, or downloading a resource.
        </p>

        <h3 style={{ fontSize: '22px', marginTop: '32px', marginBottom: '16px' }}>Testimonials and social proof</h3>
        <p style={{ marginBottom: '24px' }}>
          Testimonials and social proof build trust with visitors by showing that others have had positive experiences with your product, service, or brand. They help potential customers feel more confident in making a decision.
        </p>

        <h3 style={{ fontSize: '22px', marginTop: '32px', marginBottom: '16px' }}>Footer</h3>
        <p style={{ marginBottom: '24px' }}>
          The footer is the section at the bottom of a webpage. It usually appears on every page and contains information or links that are helpful for visitors, but not essential enough to display higher up.
        </p>

        <hr style={{ border: 'none', borderTop: '1px solid var(--line)', margin: '48px 0' }} />

        <h2 style={{ fontSize: '28px', marginTop: '48px', marginBottom: '20px' }}>Behind-the-scenes parts of a website (technical layer)</h2>
        <p style={{ marginBottom: '24px' }}>
          The parts of a website you see are only one aspect. Behind the scenes, there’s a technical layer that makes your site functional and keeps it online.
        </p>

        <h3 style={{ fontSize: '22px', marginTop: '32px', marginBottom: '16px' }}>Frontend code</h3>
        <p style={{ marginBottom: '24px' }}>
          Frontend code controls everything visitors can see and interact with on your website. It’s traditionally built using the big three: HTML (structure), CSS (style), and JavaScript (interactivity).
        </p>

        <h3 style={{ fontSize: '22px', marginTop: '32px', marginBottom: '16px' }}>Backend infrastructure</h3>
        <p style={{ marginBottom: '24px' }}>
          Backend code runs on the server and handles the parts of a website that visitors don’t directly see. It processes requests, manages data, and delivers the right content to the frontend.
        </p>

        <h3 style={{ fontSize: '22px', marginTop: '32px', marginBottom: '16px' }}>Domain name & Web hosting</h3>
        <p style={{ marginBottom: '24px' }}>
          A domain name is your website’s address on the Internet. Web hosting is the service that stores your website’s files and makes them accessible on the internet.
        </p>

        <hr style={{ border: 'none', borderTop: '1px solid var(--line)', margin: '48px 0' }} />

        <h2 style={{ fontSize: '28px', marginTop: '48px', marginBottom: '20px' }}>Conclusion</h2>
        <p style={{ marginBottom: '24px' }}>
          A website is more than just what visitors see on the screen. From the visible elements, like headers, footers, and navigation menus, to the behind-the-scenes components like codebase and domain name, each part plays an important role in the overall user experience and performance.
        </p>
        <p style={{ marginBottom: '24px' }}>
          Understanding the anatomy of a website helps you design, build, and maintain a site that looks good, functions smoothly, and meets your goals.
        </p>

      </article>
    </div>
  );
}
