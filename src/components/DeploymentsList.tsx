import { Fragment } from 'react'
import {
  Box,
  Grid,
  GridItem,
  IconButton,
  Text,
  Link,
  Tooltip,
  useTheme,
  useMediaQuery,
} from '@chakra-ui/react'
import { DeleteIcon, EditIcon } from '@liftedinit/ui'
import Pagination from './Pagination'
import { WebDeployInfoWithUuid } from '../features/deployments'

const formatUrlDisplay = (url: string) => {
  if (url.length <= 34) {
    return url // return the original string if it's 34 characters or less
  }
  const start = url.slice(0, 17)
  const end = url.slice(-21)
  return `${start}...${end}`
}

const Td = (props: any) => {
  const { label, value } = props
  const theme = useTheme()
  const [isMobile] = useMediaQuery('(max-width: 640px)')

  return (
    <GridItem
      colSpan={1}
      borderBottom={isMobile ? 'none' : `1px solid ${theme.colors.gray[200]}`}
      py={2}
      display="flex"
      alignItems="center"
      minW={0}
      pr={3}
    >
      {isMobile ? (
        <Box>
          <Text fontWeight="bold">{label}</Text>
          <Text>
            {label === 'URL' ? (
              <Link
                href={`${value}`}
                sx={{
                  display: 'block',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '270px',
                }}
              >
                {value.replace('https://', '')}
              </Link>
            ) : (
              <>{value}</>
            )}
          </Text>
        </Box>
      ) : (
        <Tooltip
          label={label === 'URL' ? value.replace('https://', '') : value}
          aria-label="URL"
          openDelay={500}
        >
          <Text
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {label === 'URL' ? (
              <Link href={`${value}`}>
                {formatUrlDisplay(value.replace('https://', ''))}
              </Link>
            ) : (
              <>{value}</>
            )}
          </Text>
        </Tooltip>
      )}
    </GridItem>
  )
}

export default function DeploymentsList(props: any) {
  const {
    currentPage,
    deployments,
    onDelete,
    onEdit,
    nextBtnProps,
    prevBtnProps,
    numPages,
  } = props
  const theme = useTheme()
  const [isMobile] = useMediaQuery('(max-width: 640px)')

  return (
    <>
      <Grid
        templateColumns={isMobile ? '1fr' : '1fr 1fr 2fr 1fr 1fr'}
        gap={0}
        mt={4}
        mb={10}
      >
        <GridItem
          colSpan={1}
          borderBottom={`1px solid ${theme.colors.gray[200]}`}
          py={2}
          display={isMobile ? 'none' : 'flex'}
          alignItems="center"
        >
          <Text fontWeight="bold">Name</Text>
        </GridItem>
        <GridItem
          colSpan={1}
          borderBottom={`1px solid ${theme.colors.gray[200]}`}
          py={2}
          display={isMobile ? 'none' : 'flex'}
          alignItems="center"
        >
          <Text fontWeight="bold">Description</Text>
        </GridItem>
        <GridItem
          colSpan={1}
          borderBottom={`1px solid ${theme.colors.gray[200]}`}
          py={2}
          display={isMobile ? 'none' : 'flex'}
          alignItems="center"
        >
          <Text fontWeight="bold">URL</Text>
        </GridItem>
        <GridItem
          colSpan={1}
          borderBottom={`1px solid ${theme.colors.gray[200]}`}
          py={2}
          display={isMobile ? 'none' : 'flex'}
          alignItems="center"
        >
          <Text fontWeight="bold">Domain</Text>
        </GridItem>
        <GridItem
          colSpan={1}
          borderBottom={`1px solid ${theme.colors.gray[200]}`}
          display={isMobile ? 'none' : 'flex'}
        ></GridItem>
        {deployments.map((deployment: WebDeployInfoWithUuid) => {
          const { uuid, siteName, siteDescription, deploymentUrl, domain } =
            deployment
          return (
            <Fragment key={uuid}>
              <Td label="Name" value={siteName} />
              <Td label="Description" value={siteDescription} />
              <Td label="URL" value={deploymentUrl} />
              <Td label="Domain" value={domain} />

              <GridItem
                colSpan={1}
                borderBottom={`1px solid ${theme.colors.gray[200]}`}
                py={2}
                display="flex"
                alignItems="center"
                justifyContent={isMobile ? 'flex-start' : 'flex-end'}
              >
                <IconButton
                  onClick={() => onEdit(uuid)}
                  aria-label="Redeploy"
                  icon={<EditIcon />}
                  size="sm"
                  fontWeight="normal"
                  mr={3}
                />
                <IconButton
                  onClick={() => onDelete(uuid)}
                  aria-label="Delete"
                  icon={<DeleteIcon />}
                  size="sm"
                  fontWeight="normal"
                >
                  Delete
                </IconButton>
              </GridItem>
            </Fragment>
          )
        })}
      </Grid>

      <Pagination
        currentPage={currentPage}
        nextBtnProps={nextBtnProps}
        prevBtnProps={prevBtnProps}
        numPages={numPages}
      />
    </>
  )
}
