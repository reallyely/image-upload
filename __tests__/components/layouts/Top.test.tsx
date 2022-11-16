import { render, screen } from '@testing-library/react'
import { Top } from '@/components/layout'

describe('Top Content', () => {
  it('Doesnt explode', () => {
    render(<Top />)
  })

  it("Holds left and right content", () => {
    render(<Top left={<div>Hello left</div>} right={<div>Hello right</div>} />)
    expect(screen.getByText("Hello left")).toBeVisible()
    expect(screen.getByText("Hello right")).toBeVisible()
  })
})
