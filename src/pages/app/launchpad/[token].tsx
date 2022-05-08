import dayjs from 'dayjs'
import { GetStaticPaths, GetStaticProps } from 'next'
import { Launchpad, LaunchpadData } from 'src/components/screens/Launchpad'
import { Page, PageStaticProps } from 'src/types/page'

type LaunchpadPageStaticProps = {
  data: Omit<LaunchpadData, 'sale'> & {
    sale: Omit<LaunchpadData['sale'], 'start' | 'end'> & {
      start: string
      end: string
    }
  }
}

type LaunchpadPageContext = {
  token: string
}

export const getStaticPaths: GetStaticPaths = () => ({
  paths: [],
  fallback: 'blocking',
})

export const getStaticProps: GetStaticProps<
  LaunchpadPageStaticProps,
  LaunchpadPageContext
> = async ({ params: { token } = {} }) => {
  if (typeof token !== 'string') return { notFound: true }
  try {
    const data: LaunchpadPageStaticProps['data'] = await import(
      `public/data/launchpad/${token}.json`
    )
    const props: PageStaticProps<LaunchpadPageStaticProps> = {
      data,
      seoProps: {
        siteTitle: `${data.token.symbol} Token Public Sale`,
        description: data.information.details,
        image: data.ogImage,
      },
    }
    return {
      props: JSON.parse(JSON.stringify(props)),
    }
  } catch (e) {
    return { notFound: true }
  }
}

const LaunchpadPage: Page<LaunchpadPageStaticProps> = ({ data }) => (
  <Launchpad
    data={{
      ...data,
      sale: {
        ...data.sale,
        start: dayjs(data.sale.start),
        end: dayjs(data.sale.end),
      },
    }}
  />
)

export default LaunchpadPage
